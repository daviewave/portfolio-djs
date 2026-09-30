import { profile } from "@/content";

const linkClass =
	"text-ink underline underline-offset-[0.25rem] hover:text-muted";

export function Contact() {
	return (
		<div className="max-w-[40rem] text-[1.125rem] leading-[1.6] text-muted">
			<p>
				The fastest way to reach me is{" "}
				<a className={linkClass} href={`mailto:${profile.email}`}>
					{profile.email}
				</a>
				. My{" "}
				<a className={linkClass} href={profile.resumePath}>
					resume
				</a>{" "}
				has the full history, and my{" "}
				<a className={linkClass} href={profile.github}>
					GitHub
				</a>{" "}
				and{" "}
				<a className={linkClass} href={profile.linkedin}>
					LinkedIn
				</a>{" "}
				have the rest.
			</p>
		</div>
	);
}
