import { render, screen } from "@testing-library/react";
import { now } from "@/content";
import { Now } from "./Now";

test("renders the narrative and every recent win", () => {
	render(<Now />);
	for (const paragraph of now.paragraphs)
		expect(screen.getByText(paragraph)).toBeInTheDocument();
	expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
		now.recent.length,
	);
	expect(screen.getByText("3.6x faster graph analytics")).toBeInTheDocument();
});
