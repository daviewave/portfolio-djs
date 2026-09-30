import { m, useScroll } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components";
import { roles } from "@/content";
import { useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { areaDotStyles } from "../../Home.styles";
import { railStyles } from "./ExperienceRail.styles";

export function ExperienceRail() {
	const listRef = useRef<HTMLOListElement>(null);
	const { reduced } = useMotionPreference();
	const { scrollYProgress } = useScroll({
		target: listRef,
		offset: ["start 80%", "end 60%"],
	});
	return (
		<div className="relative">
			<m.div
				aria-hidden="true"
				className={railStyles.progress}
				style={{ scaleY: reduced ? 1 : scrollYProgress }}
			/>
			<ol ref={listRef} className={railStyles.list}>
				{roles.map((role) => (
					<Reveal
						as="li"
						key={`${role.year}-${role.org}`}
						className={railStyles.entry}
					>
						<span
							aria-hidden="true"
							className={cn(railStyles.dot, areaDotStyles[role.area])}
						/>
						<p className={railStyles.year}>{role.year}</p>
						<h3 className={railStyles.title}>
							{role.title}
							<span className={railStyles.org}> at {role.org}</span>
						</h3>
						<p className={railStyles.summary}>{role.summary}</p>
					</Reveal>
				))}
			</ol>
		</div>
	);
}
