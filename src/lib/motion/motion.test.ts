import { act, renderHook } from "@testing-library/react";
import { createPointerStore, scheduler, useMotionPreference } from "./index";

type FrameCallback = (time: number) => void;

const stubAnimationFrames = () => {
	const frames = new Map<number, FrameCallback>();
	let nextId = 1;
	vi.stubGlobal(
		"requestAnimationFrame",
		vi.fn((cb: FrameCallback) => {
			const id = nextId++;
			frames.set(id, cb);
			return id;
		}),
	);
	vi.stubGlobal(
		"cancelAnimationFrame",
		vi.fn((id: number) => {
			frames.delete(id);
		}),
	);
	const runFrame = (time: number) => {
		const pending = [...frames.entries()];
		frames.clear();
		for (const [, cb] of pending) cb(time);
	};
	return { frames, runFrame };
};

describe("scheduler", () => {
	it("runs one animation frame per tick for every subscriber", () => {
		const { frames, runFrame } = stubAnimationFrames();
		const first = vi.fn();
		const second = vi.fn();
		const stopFirst = scheduler.add(first);
		const stopSecond = scheduler.add(second);

		expect(frames.size).toBe(1);
		runFrame(16);
		expect(first).toHaveBeenCalledWith(16);
		expect(second).toHaveBeenCalledWith(16);
		expect(frames.size).toBe(1);

		stopFirst();
		stopSecond();
	});

	it("stops requesting frames once the last subscriber leaves", () => {
		const { frames, runFrame } = stubAnimationFrames();
		const stop = scheduler.add(vi.fn());
		expect(scheduler.active).toBe(true);

		stop();
		runFrame(32);
		expect(frames.size).toBe(0);
		expect(scheduler.active).toBe(false);
	});
});

describe("createPointerStore", () => {
	it("records pointer position and clears active on leave", () => {
		const target = document.createElement("div");
		const store = createPointerStore(target);
		store.start();

		target.dispatchEvent(
			new PointerEvent("pointermove", { clientX: 12, clientY: 34 }),
		);
		expect(store.get()).toEqual({ x: 12, y: 34, active: true });

		target.dispatchEvent(new PointerEvent("pointerleave"));
		expect(store.get().active).toBe(false);
		store.stop();
	});

	it("listens passively and detaches on stop", () => {
		const target = document.createElement("div");
		const add = vi.spyOn(target, "addEventListener");
		const remove = vi.spyOn(target, "removeEventListener");
		const store = createPointerStore(target);

		store.start();
		expect(add).toHaveBeenCalledWith("pointermove", expect.any(Function), {
			passive: true,
		});
		expect(add).toHaveBeenCalledWith("pointerleave", expect.any(Function), {
			passive: true,
		});

		store.stop();
		expect(remove).toHaveBeenCalledTimes(2);
	});
});

type ChangeListener = (event: { matches: boolean }) => void;

const stubMatchMedia = (matches: Record<string, boolean>) => {
	const listeners = new Map<string, ChangeListener>();
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn((query: string) => ({
			matches: matches[query] ?? false,
			media: query,
			addEventListener: vi.fn((_: string, cb: ChangeListener) => {
				listeners.set(query, cb);
			}),
			removeEventListener: vi.fn((_: string) => {
				listeners.delete(query);
			}),
		})),
	});
	return listeners;
};

const REDUCED = "(prefers-reduced-motion: reduce)";
const FINE = "(hover: hover) and (pointer: fine)";

describe("useMotionPreference", () => {
	it("reflects the current media queries", () => {
		stubMatchMedia({ [REDUCED]: true, [FINE]: true });
		const { result } = renderHook(() => useMotionPreference());
		expect(result.current).toEqual({ reduced: true, finePointer: true });
	});

	it("updates when a query changes and cleans up its listeners", () => {
		const listeners = stubMatchMedia({ [REDUCED]: false, [FINE]: true });
		const { result, unmount } = renderHook(() => useMotionPreference());
		expect(result.current.reduced).toBe(false);

		act(() => {
			listeners.get(REDUCED)?.({ matches: true });
		});
		expect(result.current.reduced).toBe(true);

		unmount();
		expect(listeners.size).toBe(0);
	});
});
