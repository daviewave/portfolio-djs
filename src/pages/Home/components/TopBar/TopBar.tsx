import { ThemeToggle } from "@/components";
import { profile } from "@/content";
import { barStyles } from "../../Home.styles";
import type { TopBarProps } from "../../Home.types";
import { SectionNav } from "../SectionNav";

export function TopBar({ sections, activeId }: TopBarProps) {
	return (
		<header className={barStyles.bar}>
			<div className={barStyles.inner}>
				<a href="#main" className={barStyles.wordmark}>
					{profile.name}
				</a>
				<div className={barStyles.right}>
					<SectionNav sections={sections} activeId={activeId} variant="bar" />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
