import { m } from "motion/react";
import { EASE_OUT_EXPO, useMotionPreference } from "@/lib/motion";
import type { RevealProps } from "./Reveal.types";

const motionTags = { div: m.div, li: m.li, section: m.section } as const;

export function Reveal({
	children,
	className,
	id,
	delay = 0,
	as = "div",
}: RevealProps) {
	const { reduced } = useMotionPreference();
	if (reduced) {
		const Tag = as;
		return (
			<Tag id={id} className={className}>
				{children}
			</Tag>
		);
	}
	const MotionTag = motionTags[as];
	return (
		<MotionTag
			id={id}
			className={className}
			initial={{ opacity: 0, y: 8 }}
			whileInView={{ opacity: 1, y: 0 }}
			// A margin rather than a visible fraction: a section taller than five
			// screens can never be 20% in view on a short phone.
			viewport={{ once: true, margin: "0px 0px -12% 0px" }}
			transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
		>
			{children}
		</MotionTag>
	);
}
