import { renderHook } from "@testing-library/react";
import { animate } from "motion/react";
import { useMotionPreference } from "@/lib/motion";
import { useCountUp } from "./useCountUp";

vi.mock("motion/react", () => ({ animate: vi.fn() }));
vi.mock("@/lib/motion", () => ({ useMotionPreference: vi.fn() }));

const animateMock = vi.mocked(animate);
const preference = vi.mocked(useMotionPreference);
const stop = vi.fn();

type Options = { onUpdate?: (latest: number) => void };

beforeEach(() => {
	stop.mockClear();
	animateMock.mockImplementation(((
		_from: number,
		to: number,
		options: Options,
	) => {
		options.onUpdate?.(to * 0.6180339887);
		options.onUpdate?.(to);
		return { stop };
	}) as unknown as typeof animate);
});

test("returns the target immediately under reduced motion without animating", () => {
	preference.mockReturnValue({ reduced: true, finePointer: true });
	const { result } = renderHook(() => useCountUp(117, true));
	expect(result.current).toBe(117);
	expect(animateMock).not.toHaveBeenCalled();
});

test("stays at zero until active, then animates to the target keeping its decimals", () => {
	preference.mockReturnValue({ reduced: false, finePointer: true });
	const { result, rerender } = renderHook(
		({ active }) => useCountUp(3.6, active),
		{
			initialProps: { active: false },
		},
	);
	expect(result.current).toBe(0);
	expect(animateMock).not.toHaveBeenCalled();
	rerender({ active: true });
	expect(result.current).toBe(3.6);
	expect(animateMock).toHaveBeenCalledTimes(1);
});

test("rounds integer targets to integers and stops the animation on unmount", () => {
	preference.mockReturnValue({ reduced: false, finePointer: true });
	const { result, unmount } = renderHook(() => useCountUp(117, true));
	expect(result.current).toBe(117);
	unmount();
	expect(stop).toHaveBeenCalled();
});
