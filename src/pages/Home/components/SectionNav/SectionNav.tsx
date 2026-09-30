import { navStyles } from "../../Home.styles";
import type { SectionNavProps } from "../../Home.types";

export function SectionNav({ sections, activeId, variant }: SectionNavProps) {
	const chips = variant === "chips";
	return (
		<nav aria-label={chips ? "Jump to section" : "Sections"}>
			<ul className={chips ? navStyles.chips : navStyles.bar}>
				{sections.map((section) => {
					const active = activeId === section.id;
					return (
						<li key={section.id}>
							<a
								href={`#${section.id}`}
								aria-current={active ? "true" : undefined}
								className={
									chips ? navStyles.chip(active) : navStyles.barLink(active)
								}
							>
								{section.label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
