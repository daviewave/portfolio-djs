import { profile } from "@/content";
import { barStyles } from "../../Home.styles";
import type { TopBarProps } from "../../Home.types";
import { SectionNav } from "../SectionNav";

const profileLinks = [
	{ label: "GitHub", href: profile.github },
	{ label: "LinkedIn", href: profile.linkedin },
	{ label: "Resume", href: profile.resumePath },
];

export function TopBar({ sections, activeId }: TopBarProps) {
	return (
		<header className={barStyles.bar}>
			<div className={barStyles.inner}>
				<a href="#main" className={barStyles.wordmark}>
					{profile.name}
				</a>
				<div className={barStyles.right}>
					<SectionNav sections={sections} activeId={activeId} variant="bar" />
					<nav aria-label="Profiles and resume">
						<ul className={barStyles.profiles}>
							{profileLinks.map((link) => (
								<li key={link.label}>
									<a href={link.href} className={barStyles.profile}>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
