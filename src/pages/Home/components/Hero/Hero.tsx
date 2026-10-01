import { m } from "motion/react";
import { MorphHeading } from "@/components";
import { profile } from "@/content";
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

const Actions = () => (
	<div className={heroStyles.actions}>
		<a className={heroStyles.primary} href={`mailto:${profile.email}`}>
			Say hi
		</a>
		<a className={heroStyles.quiet} href={profile.resumePath}>
			Resume
		</a>
		<a className={heroStyles.quiet} href={profile.github}>
			GitHub
		</a>
		<a className={heroStyles.quiet} href={profile.linkedin}>
			LinkedIn
		</a>
	</div>
);

const Heading = () => (
	<MorphHeading level={1} className={heroStyles.heading}>
		{profile.headline}
	</MorphHeading>
);

const StillHero = () => (
	<div className={heroStyles.wrap}>
		<Photo />
		<div>
			<Heading />
			<p className={heroStyles.intro}>{profile.intro.join(" ")}</p>
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
					<Heading />
				</m.div>
				<m.p variants={arrive} className={heroStyles.intro}>
					{profile.intro.join(" ")}
				</m.p>
				<m.div variants={arrive}>
					<Actions />
				</m.div>
			</div>
		</m.div>
	);
}
