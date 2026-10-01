import { render, screen, within } from "@testing-library/react";
import { profile, projects, roles } from "@/content";
import { HomePage } from "./HomePage";

vi.mock("motion/react", () => import("@/test/motionMock"));

const renderPage = () => render(<HomePage />);

const TITLES = ["Where I've been", "What I've built", "Say hi"];

test("greets with a headshot and renders every section heading", () => {
	renderPage();
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
		profile.headline,
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
	expect(within(bar).getAllByRole("link")).toHaveLength(3);
	const chips = screen.getByRole("navigation", { name: "Jump to section" });
	expect(within(chips).getAllByRole("link")).toHaveLength(3);
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
	expect(within(footer).getByText(/^section 01 \/ 03$/)).toBeInTheDocument();
	expect(
		within(footer).getByRole("link", { name: "GitHub" }),
	).toBeInTheDocument();
	expect(
		within(footer).getByRole("link", { name: "Resume" }),
	).toBeInTheDocument();
});

test("hash targets carry their scroll margin", () => {
	renderPage();
	for (const id of ["experience", "projects", "contact"]) {
		const target = document.getElementById(id);
		expect(target?.tagName).toBe("SECTION");
		expect(target?.className).toContain("scroll-mt-");
	}
});

test("numbers the sections and the footer carries a colophon", () => {
	renderPage();
	expect(screen.getByText("01 / 03")).toBeInTheDocument();
	expect(
		screen.getByRole("link", { name: /source is on GitHub/ }),
	).toBeInTheDocument();
});

test("links to GitHub, LinkedIn and the resume from the top bar and the hero", () => {
	renderPage();
	const bar = screen.getByRole("navigation", { name: "Profiles and resume" });
	for (const name of ["GitHub", "LinkedIn", "Resume"]) {
		expect(within(bar).getByRole("link", { name })).toBeInTheDocument();
		expect(screen.getAllByRole("link", { name }).length).toBeGreaterThanOrEqual(
			3,
		);
	}
	expect(screen.getByText(/Wolverine, a digital twin/)).toBeInTheDocument();
});
