import { MorphHeading, ProgressRail, Reveal } from "@/components";
import { areas } from "@/content";
import { cn } from "@/lib/utils";
import {
	Contact,
	ExperienceRail,
	Metrics,
	ProjectLedger,
	StackGraph,
	StickyPanel,
} from "./components";
import { areaDotStyles, homeStyles } from "./Home.styles";
import type { SectionInfo, SectionProps } from "./Home.types";
import { useScrollSpy } from "./hooks/useScrollSpy";

const sections: SectionInfo[] = [
	{ id: "now", label: "Now" },
	{ id: "stack", label: "Stack" },
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
	{ id: "contact", label: "Contact" },
];

const Section = ({ id, title, children }: SectionProps) => (
	<Reveal as="section" className="scroll-mt-[3rem]">
		<div id={id}>
			<MorphHeading level={2} className={homeStyles.sectionTitle}>
				{title}
			</MorphHeading>
			<div className={homeStyles.sectionBody}>{children}</div>
		</div>
	</Reveal>
);

const AreaLegend = () => (
	<ul className={homeStyles.legend}>
		{areas.map((area) => (
			<li key={area.id} className="flex items-center gap-[0.5rem]">
				<span
					aria-hidden="true"
					className={cn(homeStyles.legendDot, areaDotStyles[area.id])}
				/>
				{area.label}
			</li>
		))}
	</ul>
);

const NowCopy = () => (
	<div className="flex flex-col gap-[1.25rem]">
		<p className={homeStyles.prose}>
			I lead engineering on Wolverine at Cyberhill Partners: a self-healing
			cybersecurity knowledge-graph platform that our team of about twenty took
			from proof of concept to an agentic AI product on AWS Marketplace. Most
			weeks that means graph queries on Neptune, LLM pipelines on Bedrock, a
			Django and React codebase, and the CI/CD and infrastructure that keep
			releases boring.
		</p>
		<p className={homeStyles.prose}>
			The pattern I care about most is making the work legible: a single
			Makefile as the front door, tests gating every stage, and documentation
			that writes itself from the code so nobody has to ask twice.
		</p>
	</div>
);

export function HomePage() {
	const activeId = useScrollSpy(sections.map((section) => section.id));
	return (
		<div className={homeStyles.shell}>
			<StickyPanel sections={sections} activeId={activeId} />
			<main id="main" className={homeStyles.ledger}>
				<Section id="now" title="Now">
					<NowCopy />
					<div className="mt-[3rem]">
						<Metrics />
					</div>
				</Section>
				<Section id="stack" title="What I work with">
					<StackGraph />
					<AreaLegend />
				</Section>
				<Section id="experience" title="Where I've been">
					<ExperienceRail />
				</Section>
				<Section id="projects" title="Projects on GitHub">
					<ProjectLedger />
				</Section>
				<Section id="contact" title="Get in touch">
					<Contact />
				</Section>
			</main>
			<ProgressRail sections={sections} activeId={activeId} />
		</div>
	);
}
