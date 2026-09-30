import { render, screen } from "@testing-library/react";
import App from "./App";
import { stubCanvasContext } from "./test/canvas";

vi.mock("motion/react", () => import("@/test/motionMock"));

beforeEach(() => {
	stubCanvasContext();
});

test("renders the name as the page's h1 and a skip link", () => {
	render(<App />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"David Silveira",
	);
	expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
		"href",
		"#main",
	);
});
