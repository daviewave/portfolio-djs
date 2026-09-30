import { render, screen } from "@testing-library/react";
import { useInView } from "motion/react";
import { useMotionPreference } from "@/lib/motion";
import { MorphHeading } from "./MorphHeading";

vi.mock("motion/react", () => ({ useInView: vi.fn() }));
vi.mock("@/lib/motion", () => ({ useMotionPreference: vi.fn() }));

const inView = vi.mocked(useInView);
const preference = vi.mocked(useMotionPreference);

test("has the morph class and toggles data-inview when the heading is seen", () => {
	preference.mockReturnValue({ reduced: false, finePointer: true });
	inView.mockReturnValue(false);
	const { rerender } = render(<MorphHeading id="now">Now</MorphHeading>);
	const heading = screen.getByRole("heading", { level: 2 });
	expect(heading).toHaveClass("morph");
	expect(heading).toHaveAttribute("id", "now");
	expect(heading).toHaveAttribute("data-inview", "false");
	inView.mockReturnValue(true);
	rerender(<MorphHeading id="now">Now</MorphHeading>);
	expect(heading).toHaveAttribute("data-inview", "true");
});

test("is in view immediately under reduced motion and honors level 1", () => {
	preference.mockReturnValue({ reduced: true, finePointer: true });
	inView.mockReturnValue(false);
	render(<MorphHeading level={1}>David</MorphHeading>);
	expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute(
		"data-inview",
		"true",
	);
});
