import { m, useScroll } from "motion/react";
import type { ProgressRailProps } from "./ProgressRail.types";

export function ProgressRail({ sections, activeId }: ProgressRailProps) {
	const { scrollYProgress } = useScroll();
	return (
		<nav
			aria-label="Section progress"
			className="fixed right-[1rem] top-1/2 hidden -translate-y-1/2 lg:block"
		>
			<div className="relative flex flex-col items-center gap-[1rem] py-[0.5rem]">
				<div
					aria-hidden="true"
					className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line"
				/>
				<m.div
					aria-hidden="true"
					className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-ink"
					style={{ scaleY: scrollYProgress }}
				/>
				{sections.map((section) => (
					<a
						key={section.id}
						href={`#${section.id}`}
						aria-current={section.id === activeId ? "true" : undefined}
						className="relative block h-[0.5rem] w-[0.5rem] rounded-full bg-line transition-colors aria-[current=true]:bg-accent aria-[current=true]:shadow-[0_0_0.75rem_var(--accent)] hover:bg-muted"
					>
						<span className="sr-only">{section.label}</span>
					</a>
				))}
			</div>
		</nav>
	);
}
