import { fireEvent, render, screen, within } from "@testing-library/react";
import { ThemeProvider } from "@/components";
import { projects, roles } from "@/content";
import { stubCanvasContext } from "@/test/canvas";
import { HomePage } from "./HomePage";

vi.mock("motion/react", () => import("@/test/motionMock"));
vi.mock("react-force-graph-2d", () => import("@/test/forceGraphMock"));
vi.mock("react-force-graph-3d", () => import("@/test/forceGraphMock"));

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

const TITLES = [
	"What I'm working on",
	"What I build with",
	"Where I've been",
	"Things I've made",
	"Say hi",
];

test("greets with a headshot and renders every section heading", () => {
	renderPage();
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		"Hi, I'm David.",
	);
	expect(screen.getByRole("img", { name: "David Silveira" })).toHaveAttribute(
		"src",
		"/images/profile.jpeg",
	);
	for (const title of TITLES) {
		expect(
			screen.getByRole("heading", { level: 2, name: title }),
		).toBeInTheDocument();
	}
});

test("offers the section links in the top bar and as mobile chips", () => {
	renderPage();
	const bar = screen.getByRole("navigation", { name: "Sections" });
	expect(within(bar).getAllByRole("link")).toHaveLength(5);
	const chips = screen.getByRole("navigation", { name: "Jump to section" });
	expect(within(chips).getAllByRole("link")).toHaveLength(5);
	for (const link of within(screen.getByRole("banner")).getAllByRole("link"))
		expect(link).toHaveAttribute("href", expect.stringMatching(/.+/));
});

test("renders one experience entry per role and one row per project", () => {
	renderPage();
	for (const role of roles)
		expect(screen.getByText(role.summary)).toBeInTheDocument();
	expect(screen.getAllByRole("link", { name: /^View code/ })).toHaveLength(
		projects.length,
	);
});

test("keeps the readouts and contact links in the footer", () => {
	renderPage();
	const footer = screen.getByRole("contentinfo");
	expect(within(footer).getByText(/^section 01 \/ 05$/)).toBeInTheDocument();
	expect(
		within(footer).getByRole("link", { name: "GitHub" }),
	).toBeInTheDocument();
	expect(
		within(footer).getByRole("link", { name: "Resume" }),
	).toBeInTheDocument();
});

test("hash targets carry their scroll margin", () => {
	renderPage();
	for (const id of ["now", "stack", "experience", "projects", "contact"]) {
		const target = document.getElementById(id);
		expect(target?.tagName).toBe("SECTION");
		expect(target?.className).toContain("scroll-mt-");
	}
});

test("hints at clicking the graph until a node is selected", () => {
	renderPage();
	expect(screen.getByText(/click around/i)).toBeInTheDocument();
	expect(screen.getByText("01 / 05")).toBeInTheDocument();
	const node = screen.queryByRole("button", { name: "Django" });
	if (node) {
		fireEvent.click(node);
		expect(screen.queryByText(/click around/i)).toBeNull();
		expect(
			screen.getByRole("heading", { level: 3, name: "Django" }),
		).toBeInTheDocument();
	}
});

test("a technology tag in the experience rail selects that node and shows its detail", async () => {
	const { fireEvent } = await import("@testing-library/react");
	renderPage();
	fireEvent.click(
		screen.getByRole("button", { name: "Show Amazon Neptune in the graph" }),
	);
	expect(
		await screen.findByRole("heading", { level: 3, name: "Amazon Neptune" }),
	).toBeInTheDocument();
	expect(screen.queryByText(/click around/i)).toBeNull();
});

test("legend highlights an area and the footer carries a colophon", async () => {
	const { fireEvent } = await import("@testing-library/react");
	renderPage();
	const backend = screen.getByRole("button", { name: /Backend/ });
	fireEvent.focus(backend);
	expect(backend).toHaveAttribute("aria-pressed", "true");
	fireEvent.blur(backend);
	expect(backend).toHaveAttribute("aria-pressed", "false");
	expect(
		screen.getByRole("link", { name: /source is on GitHub/ }),
	).toBeInTheDocument();
});
