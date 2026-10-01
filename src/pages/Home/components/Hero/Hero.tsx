import { m } from "motion/react";
import { MorphHeading } from "@/components";
import { profile, roles } from "@/content";
import { EASE_OUT_EXPO, useMotionPreference } from "@/lib/motion";
import { heroStyles } from "../../Home.styles";

const PHOTO_SIZE = 128;

const arrive = {
	hidden: { opacity: 0, y: 12 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: EASE_OUT_EXPO },
	},
};
const photoArrive = {
	hidden: { opacity: 0, scale: 0.94 },
	show: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.8, ease: EASE_OUT_EXPO },
	},
};
const sequence = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const Photo = () => (
	<img
		src="/images/profile.jpeg"
		alt={profile.name}
		width={PHOTO_SIZE}
		height={PHOTO_SIZE}
		loading="eager"
		className={heroStyles.photo}
	/>
);

const Status = () => (
	<p className={heroStyles.status}>
		Right now: {profile.role} at {roles[0].org}, {profile.location}
	</p>
);

const Actions = () => (
	<div className={heroStyles.actions}>
		<a className={heroStyles.primary} href={`mailto:${profile.email}`}>
			Say hi
		</a>
		<a className={heroStyles.quiet} href={profile.resumePath}>
			Resume
		</a>
	</div>
);

const StillHero = () => (
	<div className={heroStyles.wrap}>
		<Photo />
		<div>
			<MorphHeading level={1} className={heroStyles.heading}>
				Hi, I'm David.
			</MorphHeading>
			<p className={heroStyles.intro}>{profile.intro.join(" ")}</p>
			<Status />
			<Actions />
		</div>
	</div>
);

export function Hero() {
	const { reduced } = useMotionPreference();
	if (reduced) return <StillHero />;
	return (
		<m.div
			className={heroStyles.wrap}
			variants={sequence}
			initial="hidden"
			animate="show"
		>
			<m.div variants={photoArrive}>
				<Photo />
			</m.div>
			<div>
				<m.div variants={arrive}>
					<MorphHeading level={1} className={heroStyles.heading}>
						Hi, I'm David.
					</MorphHeading>
				</m.div>
				<m.p variants={arrive} className={heroStyles.intro}>
					{profile.intro.join(" ")}
				</m.p>
				<m.div variants={arrive}>
					<Status />
				</m.div>
				<m.div variants={arrive}>
					<Actions />
				</m.div>
			</div>
		</m.div>
	);
}
