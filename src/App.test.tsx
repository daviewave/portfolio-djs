import { render, screen } from "@testing-library/react";
import App from "./App";
import { stubCanvasContext } from "./test/canvas";

vi.mock("motion/react", () => import("@/test/motionMock"));
vi.mock("react-force-graph-2d", () => import("@/test/forceGraphMock"));
vi.mock("react-force-graph-3d", () => import("@/test/forceGraphMock"));

beforeEach(() => {
	stubCanvasContext();
});

test("renders the greeting as the page's h1, the wordmark, and a skip link", () => {
	render(<App />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"Hi, I'm David.",
	);
	expect(screen.getByRole("banner")).toHaveTextContent("David Silveira");
	expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
		"href",
		"#main",
	);
});
