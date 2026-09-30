import { profile } from "@/content";

const linkClass =
	"text-ink underline underline-offset-[0.25rem] hover:text-muted";

export function Contact() {
	return (
		<div className="max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted md:text-[1.125rem]">
			<p>
				If any of this sounds like your kind of work, or you just want to talk
				shop, email me at{" "}
				<a className={linkClass} href={`mailto:${profile.email}`}>
					{profile.email}
				</a>
				. My{" "}
				<a className={linkClass} href={profile.resumePath}>
					resume
				</a>{" "}
				has the full history, and{" "}
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
