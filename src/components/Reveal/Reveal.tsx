import { m } from "motion/react";
import { useMotionPreference } from "@/lib/motion";
import type { RevealProps } from "./Reveal.types";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const motionTags = { div: m.div, li: m.li, section: m.section } as const;

export function Reveal({
	children,
	className,
	delay = 0,
	as = "div",
}: RevealProps) {
	const { reduced } = useMotionPreference();
	if (reduced) {
		const Tag = as;
		return <Tag className={className}>{children}</Tag>;
	}
	const MotionTag = motionTags[as];
	return (
		<MotionTag
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
