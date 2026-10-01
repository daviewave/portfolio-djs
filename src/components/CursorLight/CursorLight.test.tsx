import { render } from "@testing-library/react";
import { scheduler, useMotionPreference } from "@/lib/motion";
import { CursorLight } from "./CursorLight";

vi.mock("@/lib/motion", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/lib/motion")>();
	return {
		...actual,
		useMotionPreference: vi.fn(),
		scheduler: { add: vi.fn(() => vi.fn()), active: false },
	};
});

const preference = vi.mocked(useMotionPreference);

beforeEach(() => {
	vi.mocked(scheduler.add).mockClear();
});

test("lights the grid on touch screens too, driven by scroll and touch", () => {
	preference.mockReturnValue({ reduced: false, finePointer: false });
	const { container, unmount } = render(<CursorLight />);
	expect(container.querySelectorAll(".grid-field")).toHaveLength(2);
	expect(container.querySelector(".cursor-light")).not.toBeNull();
	expect(scheduler.add).toHaveBeenCalledTimes(1);
	unmount();
});

test("renders the lit layers and follows the pointer on fine pointers", () => {
	preference.mockReturnValue({ reduced: false, finePointer: true });
	const { container, unmount } = render(<CursorLight />);
	expect(container.querySelectorAll(".grid-field")).toHaveLength(2);
	expect(container.querySelector(".cursor-light")).not.toBeNull();
	expect(scheduler.add).toHaveBeenCalledTimes(1);
	unmount();
	expect(vi.mocked(scheduler.add).mock.results[0]?.value).toHaveBeenCalled();
});

test("stays static under reduced motion", () => {
	preference.mockReturnValue({ reduced: true, finePointer: true });
	const { container } = render(<CursorLight />);
	expect(container.querySelector(".cursor-light")).toBeNull();
});
