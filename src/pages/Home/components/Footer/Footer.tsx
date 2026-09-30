import { profile } from "@/content";
import { footerStyles } from "../../Home.styles";
import type { FooterProps } from "../../Home.types";
import { Readouts } from "../Readouts";

export function Footer({ activeIndex, total }: FooterProps) {
	return (
		<footer className={footerStyles.footer}>
			<div className={footerStyles.inner}>
				<ul className={footerStyles.links}>
					<li>
						<a className={footerStyles.link} href={`mailto:${profile.email}`}>
							{profile.email}
						</a>
					</li>
					<li>
						<a className={footerStyles.link} href={profile.resumePath}>
							Resume
						</a>
					</li>
					<li>
						<a className={footerStyles.link} href={profile.github}>
							GitHub
						</a>
					</li>
					<li>
						<a className={footerStyles.link} href={profile.linkedin}>
							LinkedIn
						</a>
					</li>
				</ul>
				<Readouts activeIndex={activeIndex} total={total} />
			</div>
		</footer>
	);
}
