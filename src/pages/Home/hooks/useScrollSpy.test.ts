import { act, renderHook } from "@testing-library/react";
import { useScrollSpy } from "./useScrollSpy";

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

const captured: {
	callback: Callback | null;
	observed: Element[];
	options?: IntersectionObserverInit;
	disconnect: ReturnType<typeof vi.fn>;
} = {
	callback: null,
	observed: [],
	options: undefined,
	disconnect: vi.fn(),
};

class CapturingObserver {
	constructor(callback: Callback, options?: IntersectionObserverInit) {
		captured.callback = callback;
		captured.options = options;
	}
	observe = (element: Element) => captured.observed.push(element);
	unobserve = vi.fn();
	disconnect = captured.disconnect;
	takeRecords = vi.fn(() => []);
}

const ids = ["now", "stack"];

beforeEach(() => {
	captured.callback = null;
	captured.observed = [];
	captured.disconnect = vi.fn();
	vi.stubGlobal("IntersectionObserver", CapturingObserver);
	document.body.innerHTML =
		'<section id="now"></section><section id="stack"></section>';
});

test("reports the intersecting section and cleans up", () => {
	const { result, unmount } = renderHook(() => useScrollSpy(ids));
	expect(result.current).toBeNull();
	expect(captured.observed.map((el) => el.id)).toEqual(["now", "stack"]);
	expect(captured.options?.rootMargin).toBe("-40% 0px -55% 0px");
	const stack = document.getElementById("stack") as HTMLElement;
	act(() => captured.callback?.([{ isIntersecting: true, target: stack }]));
	expect(result.current).toBe("stack");
	act(() => captured.callback?.([{ isIntersecting: false, target: stack }]));
	expect(result.current).toBe("stack");
	unmount();
	expect(captured.disconnect).toHaveBeenCalled();
});
