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
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
		>
			{children}
		</MotionTag>
	);
}
