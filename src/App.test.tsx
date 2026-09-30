import { screen } from "@testing-library/react";
import App from "./App";
import { stubCanvasContext } from "./test/canvas";
import { renderApp } from "./test/render";

vi.mock("motion/react", async () => {
	const { createElement, forwardRef } = await import("react");
	const plain = (tag: string) =>
		forwardRef((props: Record<string, unknown>, ref) => {
			const { initial, whileInView, viewport, transition, style, ...rest } =
				props;
			return createElement(tag, { ...rest, ref });
		});
	return {
		m: { div: plain("div"), li: plain("li"), section: plain("section") },
		LazyMotion: ({ children }: { children: unknown }) => children,
		domAnimation: {},
		useInView: () => true,
		useScroll: () => ({ scrollYProgress: 0 }),
		animate: (
			_from: number,
			to: number,
			options: { onUpdate?: (v: number) => void },
		) => {
			options.onUpdate?.(to);
			return { stop: vi.fn() };
		},
	};
});

beforeEach(() => {
	stubCanvasContext();
});

test("renders the name as the page's h1 and a skip link", () => {
	renderApp(<App />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"David Silveira",
	);
	expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
		"href",
		"#main",
	);
});
