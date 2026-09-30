import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { ProgressRail } from "./ProgressRail";

vi.mock("motion/react", () => ({
	m: {
		div: ({
			children,
			className,
		}: {
			children?: ReactNode;
			className?: string;
		}) => <div className={className}>{children}</div>,
	},
	useScroll: () => ({ scrollYProgress: 0 }),
}));

const sections = [
	{ id: "now", label: "Now" },
	{ id: "stack", label: "Stack" },
	{ id: "contact", label: "Contact" },
];

test("renders one link per section and marks the active one current", () => {
	render(<ProgressRail sections={sections} activeId="stack" />);
	const links = screen.getAllByRole("link");
	expect(links).toHaveLength(3);
	expect(links[1]).toHaveAttribute("href", "#stack");
	expect(links[1]).toHaveAttribute("aria-current", "true");
	expect(links[0]).not.toHaveAttribute("aria-current");
	expect(
		screen.getByRole("navigation", { name: "Sections" }),
	).toBeInTheDocument();
	expect(screen.getByText("Stack")).toHaveClass("sr-only");
});
