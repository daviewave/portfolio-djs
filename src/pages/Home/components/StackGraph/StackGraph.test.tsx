import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { areas, technologies } from "@/content";
import { useMotionPreference } from "@/lib/motion";
import { StackGraph } from "./StackGraph";
import { selectGraphTechnologies } from "./selectGraphTechnologies";

vi.mock("react-force-graph-2d", () => import("@/test/forceGraphMock"));
vi.mock("react-force-graph-3d", () => import("@/test/forceGraphMock"));
vi.mock("@/lib/motion", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/lib/motion")>();
	return { ...actual, useMotionPreference: vi.fn() };
});

const preference = vi.mocked(useMotionPreference);
const expectedNodes =
	selectGraphTechnologies(technologies).length + areas.length;

beforeEach(() => {
	preference.mockReturnValue({ reduced: false, finePointer: true });
	localStorage.clear();
	vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
		width: 800,
		height: 450,
		top: 0,
		left: 0,
		right: 800,
		bottom: 450,
		x: 0,
		y: 0,
		toJSON: () => ({}),
	});
});

test("renders the 2D graph by default with every hub and selected technology", () => {
	render(<StackGraph />);
	const graph = screen.getByTestId("force-graph");
	expect(graph).toHaveAttribute("data-mode", "2d");
	expect(graph).toHaveAttribute("data-nodes", String(expectedNodes));
	expect(
		screen.getByRole("figure", { name: /clustered around one hub/ }),
	).toBeInTheDocument();
});

test("switches to the lazily loaded 3D renderer and remembers the choice", async () => {
	render(<StackGraph />);
	fireEvent.click(screen.getByRole("button", { name: "3D" }));
	await waitFor(() =>
		expect(screen.getByTestId("force-graph")).toHaveAttribute(
			"data-mode",
			"3d",
		),
	);
	expect(localStorage.getItem("graph-mode")).toBe("3d");
	expect(screen.getByRole("button", { name: "3D" })).toHaveAttribute(
		"aria-pressed",
		"true",
	);
});

test("clicking a technology node selects it and clicking a hub does not", () => {
	const onSelect = vi.fn();
	render(<StackGraph onSelect={onSelect} />);
	fireEvent.click(
		document.querySelector('[data-node-id="python"]') as HTMLElement,
	);
	expect(onSelect).toHaveBeenCalledWith("python");
	fireEvent.click(
		document.querySelector('[data-node-id="hub:backend"]') as HTMLElement,
	);
	expect(onSelect).toHaveBeenCalledTimes(1);
});

test("the accessible technology list selects a node and reflects the selection", () => {
	const onSelect = vi.fn();
	render(<StackGraph onSelect={onSelect} selectedId="python" />);
	fireEvent.click(screen.getByRole("button", { name: "Django" }));
	expect(onSelect).toHaveBeenCalledWith("django");
	expect(screen.getByRole("button", { name: "Python" })).toHaveAttribute(
		"aria-pressed",
		"true",
	);
});

test("renders settled and static under reduced motion", () => {
	preference.mockReturnValue({ reduced: true, finePointer: true });
	render(<StackGraph />);
	const graph = screen.getByTestId("force-graph");
	expect(graph).toHaveAttribute("data-cooldown-ticks", "0");
	expect(graph).toHaveAttribute("data-warmup-ticks", "200");
});
