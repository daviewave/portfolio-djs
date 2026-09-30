import { render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@/components";
import { projects, roles, technologies } from "@/content";
import { stubCanvasContext } from "@/test/canvas";
import { HomePage } from "./HomePage";

vi.mock("motion/react", () => import("@/test/motionMock"));

beforeAll(async () => {
	await import("./components/StackGraph");
});

beforeEach(() => {
	stubCanvasContext();
});

const renderPage = () =>
	render(
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
	expect(screen.getAllByRole("link", { name: /^View code/ })).toHaveLength(
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

test("hash targets carry their scroll margin", () => {
	renderPage();
	for (const id of ["now", "stack", "experience", "projects", "contact"]) {
		const target = document.getElementById(id);
		expect(target?.tagName).toBe("SECTION");
		expect(target?.className).toContain("scroll-mt-");
	}
});
