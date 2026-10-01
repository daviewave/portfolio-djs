import { render, screen } from "@testing-library/react";
import { profile } from "@/content";
import App from "./App";

vi.mock("motion/react", () => import("@/test/motionMock"));

test("renders the greeting as the page's h1, the wordmark, and a skip link", () => {
	render(<App />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		profile.headline,
	);
	expect(screen.getByRole("banner")).toHaveTextContent("David Silveira");
	expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
		"href",
		"#main",
	);
});
