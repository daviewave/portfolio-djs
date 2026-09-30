import { screen, within } from "@testing-library/react";
import { ThemeProvider } from "@/components";
import { projects, roles, technologies } from "@/content";
import { renderApp } from "@/test/render";
import { HomePage } from "./HomePage";

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
	HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never;
});

const renderPage = () =>
	renderApp(
		<ThemeProvider>
			<HomePage />
		</ThemeProvider>,
	);

test("renders every section heading and the section nav", () => {
	renderPage();
	for (const title of [
		"Now",
		"What I work with",
		"Where I've been",
		"Projects on GitHub",
		"Get in touch",
	]) {
		expect(
			screen.getByRole("heading", { level: 2, name: title }),
		).toBeInTheDocument();
	}
	const nav = screen.getAllByRole("navigation", { name: "Sections" })[0];
	expect(within(nav).getAllByRole("link")).toHaveLength(5);
});

test("renders one experience entry per role and one row per project", () => {
	renderPage();
	for (const role of roles)
		expect(screen.getByText(role.summary)).toBeInTheDocument();
	expect(screen.getAllByRole("link", { name: "View code" })).toHaveLength(
		projects.length,
	);
});

test("renders the theme toggle and the accessible graph list", () => {
	renderPage();
	expect(
		screen.getByRole("button", { name: /switch to .* theme/i }),
	).toBeInTheDocument();
	const graph = screen.getByRole("img", { name: /graph of the technologies/i });
	expect(graph).toBeInTheDocument();
	for (const tech of technologies.slice(0, 5))
		expect(screen.getAllByText(tech.label).length).toBeGreaterThan(0);
});

test("every panel link has a destination", () => {
	renderPage();
	const header = screen.getByRole("banner");
	for (const link of within(header).getAllByRole("link"))
		expect(link).toHaveAttribute("href", expect.stringMatching(/.+/));
});
