import { render, screen } from "@testing-library/react";
import { Readouts } from "./Readouts";

test("shows the local time, scroll position and section index", () => {
	render(<Readouts activeIndex={1} total={5} />);
	expect(screen.getByText(/^Austin \d{2}:\d{2}$/)).toBeInTheDocument();
	expect(screen.getByText("scroll 00%")).toBeInTheDocument();
	expect(screen.getByText("section 02 / 05")).toBeInTheDocument();
});
