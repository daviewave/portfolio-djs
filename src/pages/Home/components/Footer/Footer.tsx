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
				<p className={footerStyles.colophon}>
					Set in Recursive, a variable font that morphs between mono and sans as
					you scroll. Built with Vite, React and Tailwind. The{" "}
					<a
						className="link-underline text-ink"
						href="https://github.com/daviewave/portfolio-djs"
					>
						source is on GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
}
