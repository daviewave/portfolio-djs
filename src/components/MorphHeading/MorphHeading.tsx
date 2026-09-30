import { useInView } from "motion/react";
import { useRef } from "react";
import { useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { MorphHeadingProps } from "./MorphHeading.types";

export function MorphHeading({
	children,
	id,
	level = 2,
	className,
}: MorphHeadingProps) {
	const ref = useRef<HTMLHeadingElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.6 });
	const { reduced } = useMotionPreference();
	const Tag = level === 1 ? "h1" : "h2";
	return (
		<Tag
			ref={ref}
			id={id}
			className={cn("morph", className)}
			data-inview={reduced || inView}
		>
			{children}
		</Tag>
	);
}
