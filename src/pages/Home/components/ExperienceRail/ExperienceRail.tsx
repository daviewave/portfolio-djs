import { m, useScroll } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components";
import { type Role, roles, technologies } from "@/content";
import { useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { areaDotStyles, areaTextStyles } from "../../Home.styles";
import { railStyles } from "./ExperienceRail.styles";

const technologyById = new Map(
	technologies.map((technology) => [technology.id, technology]),
);

const Highlights = ({ role }: { role: Role }) =>
	role.highlights.length === 0 ? null : (
		<ul className={railStyles.highlights}>
			{role.highlights.map((highlight) => (
				<li key={highlight.slice(0, 24)} className={railStyles.highlight}>
					{highlight}
				</li>
			))}
		</ul>
	);

const TechTags = ({ role }: { role: Role }) => {
	const tags = role.tech
		.map((id) => technologyById.get(id))
		.filter((t) => t !== undefined);
	if (tags.length === 0) return null;
	return (
		<ul className={railStyles.tags} aria-label={`Technologies at ${role.org}`}>
			{tags.map((technology) => (
				<li
					key={technology.id}
					className={cn(railStyles.tag, areaTextStyles[technology.area])}
				>
					{technology.label}
				</li>
			))}
		</ul>
	);
};

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
						<Highlights role={role} />
						<TechTags role={role} />
					</Reveal>
				))}
			</ol>
		</div>
	);
}
