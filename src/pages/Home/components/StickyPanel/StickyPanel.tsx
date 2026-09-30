import { MorphHeading, ThemeToggle } from "@/components";
import { profile } from "@/content";
import { homeStyles } from "../../Home.styles";
import type { StickyPanelProps } from "../../Home.types";

export function StickyPanel({ sections, activeId }: StickyPanelProps) {
	return (
		<header className={homeStyles.panel}>
			<div>
				<MorphHeading level={1} className={homeStyles.name}>
					{profile.name}
				</MorphHeading>
				<p className={homeStyles.role}>
					{profile.role} in {profile.location}
				</p>
				<p className={homeStyles.intro}>{profile.intro.join(" ")}</p>
				<nav aria-label="Sections">
					<ul className={homeStyles.navList}>
						{sections.map((section) => (
							<li key={section.id}>
								<a
									href={`#${section.id}`}
									className={homeStyles.navLink(activeId === section.id)}
									aria-current={activeId === section.id ? "true" : undefined}
								>
									<span
										className={homeStyles.navRule(activeId === section.id)}
									/>
									{section.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className={homeStyles.panelFooter}>
				<a className={homeStyles.panelLink} href={profile.github}>
					GitHub
				</a>
				<a className={homeStyles.panelLink} href={profile.linkedin}>
					LinkedIn
				</a>
				<a className={homeStyles.panelLink} href={`mailto:${profile.email}`}>
					Email
				</a>
				<ThemeToggle className="ml-auto" />
			</div>
		</header>
	);
}
