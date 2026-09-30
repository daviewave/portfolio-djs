import { now } from "@/content";
import { homeStyles } from "../../Home.styles";
import { nowStyles } from "./Now.styles";

export function Now() {
	return (
		<div className={nowStyles.wrap}>
			<div className={nowStyles.paragraphs}>
				{now.paragraphs.map((paragraph) => (
					<p key={paragraph.slice(0, 24)} className={homeStyles.prose}>
						{paragraph}
					</p>
				))}
			</div>
			<div>
				<p className={nowStyles.recentLabel}>Recently</p>
				<ul className={nowStyles.recentList}>
					{now.recent.map((win) => (
						<li key={win.headline} className={nowStyles.recentItem}>
							<h3 className={nowStyles.recentHeadline}>{win.headline}</h3>
							<p className={nowStyles.recentDetail}>{win.detail}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
