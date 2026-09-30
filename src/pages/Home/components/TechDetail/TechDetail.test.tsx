import { render, screen } from "@testing-library/react";
import { technologies } from "@/content";
import { TechDetail } from "./TechDetail";

test("invites a click when nothing is selected", () => {
	render(<TechDetail technology={null} />);
	expect(screen.getByText(/click a node/i)).toBeInTheDocument();
});

test("shows the technology's summary and where it was used", () => {
	const django = technologies.find((technology) => technology.id === "django");
	if (!django) throw new Error("fixture missing");
	render(<TechDetail technology={django} />);
	expect(
		screen.getByRole("heading", { level: 3, name: "Django" }),
	).toBeInTheDocument();
	expect(screen.getByText(/Django Ninja/)).toBeInTheDocument();
	expect(screen.getByText(/Used in/)).toBeInTheDocument();
});
