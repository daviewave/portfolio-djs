import { lazy, Suspense, useState } from "react";
import { MorphHeading, ProgressRail, Reveal } from "@/components";
import { areas, technologies } from "@/content";
import { cn } from "@/lib/utils";
import {
	Contact,
	ExperienceRail,
	ProjectLedger,
	padIndex,
	StickyPanel,
	TechDetail,
} from "./components";
import { areaDotStyles, homeStyles } from "./Home.styles";
import type { SectionInfo, SectionProps } from "./Home.types";
import { useScrollSpy } from "./hooks/useScrollSpy";

const StackGraph = lazy(() =>
	import("./components/StackGraph").then((module) => ({
		default: module.StackGraph,
	})),
);

const sections: SectionInfo[] = [
	{ id: "now", label: "Now" },
	{ id: "stack", label: "Stack" },
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
	{ id: "contact", label: "Contact" },
];

const sectionIds = sections.map((section) => section.id);

const Section = ({ id, index, total, title, children }: SectionProps) => (
	<Reveal as="section" id={id} className="scroll-mt-[3rem]">
		<div>
			<div className="flex items-end justify-between gap-[1rem]">
				<MorphHeading level={2} className={homeStyles.sectionTitle}>
					{title}
				</MorphHeading>
				<span className="pb-[0.5rem] font-mono text-[0.75rem] text-muted">
					{padIndex(index)} / {padIndex(total)}
				</span>
			</div>
			<div aria-hidden="true" className="ticks mt-[0.75rem]" />
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
	const activeId = useScrollSpy(sectionIds);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const selected =
		technologies.find((technology) => technology.id === selectedId) ?? null;
	return (
		<div className={homeStyles.shell}>
			<StickyPanel sections={sections} activeId={activeId} />
			<main id="main" className={homeStyles.ledger}>
				<Section id="now" index={1} total={5} title="Now">
					<NowCopy />
				</Section>
				<Section id="stack" index={2} total={5} title="What I work with">
					<div className="grid gap-[2rem] lg:grid-cols-[minmax(0,1fr)_17rem]">
						<Suspense
							fallback={<div className="aspect-[16/9] min-h-[18rem] w-full" />}
						>
							<StackGraph selectedId={selectedId} onSelect={setSelectedId} />
						</Suspense>
						<TechDetail technology={selected} />
					</div>
					<AreaLegend />
				</Section>
				<Section id="experience" index={3} total={5} title="Where I've been">
					<ExperienceRail />
				</Section>
				<Section id="projects" index={4} total={5} title="Projects on GitHub">
					<ProjectLedger />
				</Section>
				<Section id="contact" index={5} total={5} title="Get in touch">
					<Contact />
				</Section>
			</main>
			<ProgressRail sections={sections} activeId={activeId} />
		</div>
	);
}
