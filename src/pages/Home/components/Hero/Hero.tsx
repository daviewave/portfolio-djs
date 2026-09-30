import { MorphHeading } from "@/components";
import { profile, roles } from "@/content";
import { heroStyles } from "../../Home.styles";

const PHOTO_SIZE = 112;

export function Hero() {
	const current = roles[0];
	return (
		<div className={heroStyles.wrap}>
			<img
				src="/images/profile.jpeg"
				alt={profile.name}
				width={PHOTO_SIZE}
				height={PHOTO_SIZE}
				loading="eager"
				className={heroStyles.photo}
			/>
			<div>
				<MorphHeading level={1} className={heroStyles.heading}>
					Hi, I'm David.
				</MorphHeading>
				<p className={heroStyles.intro}>{profile.intro.join(" ")}</p>
				<p className={heroStyles.status}>
					Right now: {profile.role} at {current.org}, {profile.location}
				</p>
				<div className={heroStyles.actions}>
					<a className={heroStyles.primary} href={`mailto:${profile.email}`}>
						Say hi
					</a>
					<a className={heroStyles.quiet} href={profile.resumePath}>
						Resume
					</a>
				</div>
			</div>
		</div>
	);
}
