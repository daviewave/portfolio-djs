import { fireEvent, render, screen } from "@testing-library/react";
import { technologies } from "@/content";
import * as graph from "@/lib/graph";
import * as motion from "@/lib/motion";
import { StackGraph } from "./StackGraph";

vi.mock("@/lib/motion", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/lib/motion")>();
	return {
		...actual,
		useMotionPreference: vi.fn(() => ({ reduced: false, finePointer: true })),
		scheduler: { add: vi.fn(() => vi.fn()), active: false },
	};
});

vi.mock("@/lib/graph", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/lib/graph")>();
	return {
		...actual,
		settle: vi.fn(actual.settle),
		drawGraph: vi.fn(),
	};
});

const preference = vi.mocked(motion.useMotionPreference);
const schedulerAdd = vi.mocked(motion.scheduler.add);
const settle = vi.mocked(graph.settle);

const fakeContext = () =>
	({
		setTransform: vi.fn(),
		clearRect: vi.fn(),
		beginPath: vi.fn(),
		arc: vi.fn(),
		fill: vi.fn(),
		stroke: vi.fn(),
		fillText: vi.fn(),
		moveTo: vi.fn(),
		lineTo: vi.fn(),
		save: vi.fn(),
		restore: vi.fn(),
	}) as unknown as CanvasRenderingContext2D;

beforeEach(() => {
	preference.mockReturnValue({ reduced: false, finePointer: true });
	schedulerAdd.mockClear();
	settle.mockClear();
	vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
		fakeContext(),
	);
});

test("lists every technology for assistive tech", () => {
	render(<StackGraph />);
	const canvas = screen.getByRole("img", { name: /technologies I work with/ });
	expect(canvas.tagName).toBe("CANVAS");
	for (const technology of technologies) {
		expect(screen.getByText(technology.label)).toBeInTheDocument();
	}
});

test("reduced motion settles once and never joins the frame loop", () => {
	preference.mockReturnValue({ reduced: true, finePointer: true });
	render(<StackGraph />);
	expect(settle).toHaveBeenCalledTimes(1);
	expect(schedulerAdd).not.toHaveBeenCalled();
});

const pointerListenersOnCanvas = () =>
	vi
		.mocked(HTMLCanvasElement.prototype.addEventListener)
		.mock.calls.map(([type]) => String(type))
		.filter((type) => type.startsWith("pointer"));

test("coarse pointers get no pointer listeners", () => {
	preference.mockReturnValue({ reduced: false, finePointer: false });
	vi.spyOn(HTMLCanvasElement.prototype, "addEventListener");
	render(<StackGraph />);
	expect(pointerListenersOnCanvas()).toEqual([]);
});

test("fine pointers follow pointer movement on the canvas", () => {
	vi.spyOn(HTMLCanvasElement.prototype, "addEventListener");
	render(<StackGraph />);
	expect(pointerListenersOnCanvas()).toContain("pointermove");
});

test("unmount releases the frame loop and the resize observer", () => {
	const unsubscribe = vi.fn();
	schedulerAdd.mockReturnValue(unsubscribe);
	const disconnect = vi.fn();
	vi.stubGlobal(
		"ResizeObserver",
		class {
			observe = vi.fn();
			unobserve = vi.fn();
			disconnect = disconnect;
		},
	);
	const { unmount } = render(<StackGraph />);
	expect(schedulerAdd).toHaveBeenCalledTimes(1);
	unmount();
	expect(unsubscribe).toHaveBeenCalledTimes(1);
	expect(disconnect).toHaveBeenCalled();
});

test("the accessible technology list selects a node", () => {
	const onSelect = vi.fn();
	render(<StackGraph onSelect={onSelect} selectedId="python" />);
	fireEvent.click(screen.getByRole("button", { name: "Django" }));
	expect(onSelect).toHaveBeenCalledWith("django");
	expect(screen.getByRole("button", { name: "Python" })).toHaveAttribute(
		"aria-pressed",
		"true",
	);
});
