import { MorphHeading, ProgressRail, Reveal } from "@/components";
import {
	Contact,
	ExperienceRail,
	Footer,
	Hero,
	ProjectLedger,
	padIndex,
	SectionNav,
	TopBar,
} from "./components";
import { homeStyles } from "./Home.styles";
import type { SectionInfo, SectionProps } from "./Home.types";
import { useScrollSpy } from "./hooks/useScrollSpy";

const sections: SectionInfo[] = [
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
	{ id: "contact", label: "Say hi" },
];

const sectionIds = sections.map((section) => section.id);

const Section = ({ id, index, total, title, children }: SectionProps) => (
	<Reveal as="section" id={id} className="scroll-mt-[4.5rem]">
		<div className="flex items-end justify-between gap-[1rem]">
			<MorphHeading level={2} className={homeStyles.sectionTitle}>
				{title}
			</MorphHeading>
			<span className={homeStyles.sectionIndex}>
				{padIndex(index)} / {padIndex(total)}
			</span>
		</div>
		<div aria-hidden="true" className={homeStyles.ticks} />
		<div className={homeStyles.sectionBody}>{children}</div>
	</Reveal>
);

export function HomePage() {
	const activeId = useScrollSpy(sectionIds);
	const activeIndex = Math.max(0, sectionIds.indexOf(activeId ?? ""));
	const total = sections.length;
	return (
		<>
			<TopBar sections={sections} activeId={activeId} />
			<main id="main" className={homeStyles.main}>
				<div className="flex flex-col gap-[2rem]">
					<Hero />
					<SectionNav sections={sections} activeId={activeId} variant="chips" />
				</div>
				<Section
					id="experience"
					index={1}
					total={total}
					title="Where I've been"
				>
					<ExperienceRail />
				</Section>
				<Section id="projects" index={2} total={total} title="What I've built">
					<ProjectLedger />
				</Section>
				<Section id="contact" index={3} total={total} title="Say hi">
					<Contact />
				</Section>
			</main>
			<Footer activeIndex={activeIndex} total={total} />
			<ProgressRail sections={sections} activeId={activeId} />
		</>
	);
}
