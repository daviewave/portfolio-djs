import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { useMotionPreference } from "@/lib/motion";
import { Reveal } from "./Reveal";

vi.mock("motion/react", () => {
	type PlainProps = { children?: ReactNode; className?: string };
	const plain =
		(Tag: "div" | "li" | "section") =>
		({ children, className }: PlainProps) => (
			<Tag className={className} data-motion="true">
				{children}
			</Tag>
		);
	return {
		m: { div: plain("div"), li: plain("li"), section: plain("section") },
	};
});
vi.mock("@/lib/motion", () => ({ useMotionPreference: vi.fn() }));

const preference = vi.mocked(useMotionPreference);

test("renders a plain element with its children under reduced motion", () => {
	preference.mockReturnValue({ reduced: true, finePointer: true });
	render(
		<Reveal as="li" className="row">
			Hello
		</Reveal>,
	);
	const item = screen.getByText("Hello");
	expect(item.tagName).toBe("LI");
	expect(item).toHaveClass("row");
	expect(item).not.toHaveAttribute("data-motion");
	expect(item).not.toHaveStyle({ opacity: 0 });
});

test("renders the motion element with its children when motion is allowed", () => {
	preference.mockReturnValue({ reduced: false, finePointer: true });
	render(<Reveal>Hello</Reveal>);
	const item = screen.getByText("Hello");
	expect(item.tagName).toBe("DIV");
	expect(item).toHaveAttribute("data-motion", "true");
});
