import { lazy, Suspense, useState } from "react";
import { MorphHeading, ProgressRail, Reveal } from "@/components";
import { areas, technologies } from "@/content";
import { useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
	Contact,
	ExperienceRail,
	Footer,
	Hero,
	Now,
	ProjectLedger,
	padIndex,
	SectionNav,
	TechDetail,
	TopBar,
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

const AreaLegend = ({
	highlightArea,
	onHighlight,
}: {
	highlightArea: string | null;
	onHighlight: (area: string | null) => void;
}) => (
	<ul
		className={homeStyles.legend}
		aria-label="Skill areas; hover or focus one to highlight it in the graph"
	>
		{areas.map((area) => (
			<li key={area.id}>
				<button
					type="button"
					className={homeStyles.legendButton(highlightArea === area.id)}
					aria-pressed={highlightArea === area.id}
					onMouseEnter={() => onHighlight(area.id)}
					onMouseLeave={() => onHighlight(null)}
					onFocus={() => onHighlight(area.id)}
					onBlur={() => onHighlight(null)}
					onClick={() =>
						onHighlight(highlightArea === area.id ? null : area.id)
					}
				>
					<span
						aria-hidden="true"
						className={cn(homeStyles.legendDot, areaDotStyles[area.id])}
					/>
					{area.label}
				</button>
			</li>
		))}
	</ul>
);

export function HomePage() {
	const activeId = useScrollSpy(sectionIds);
	const activeIndex = Math.max(0, sectionIds.indexOf(activeId ?? ""));
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [highlightArea, setHighlightArea] = useState<string | null>(null);
	const selected =
		technologies.find((technology) => technology.id === selectedId) ?? null;
	const { reduced } = useMotionPreference();
	const pickTech = (id: string) => {
		setSelectedId(id);
		document.getElementById("stack")?.scrollIntoView({
			behavior: reduced ? "auto" : "smooth",
			block: "start",
		});
	};
	return (
		<>
			<TopBar sections={sections} activeId={activeId} />
			<main id="main" className={homeStyles.main}>
				<div className="flex flex-col gap-[2rem]">
					<Hero />
					<SectionNav sections={sections} activeId={activeId} variant="chips" />
				</div>
				<Section id="now" index={1} total={5} title="What I'm working on">
					<Now />
				</Section>
				<Section id="stack" index={2} total={5} title="What I build with">
					{selected === null && (
						<p className={homeStyles.hint}>
							Click around — each dot is something I've shipped with.
						</p>
					)}
					<div className={homeStyles.stackGrid}>
						<Suspense
							fallback={<div className="aspect-[16/9] min-h-[18rem] w-full" />}
						>
							<StackGraph
								selectedId={selectedId}
								highlightArea={highlightArea}
								onSelect={setSelectedId}
							/>
						</Suspense>
						<TechDetail technology={selected} />
					</div>
					<AreaLegend
						highlightArea={highlightArea}
						onHighlight={setHighlightArea}
					/>
				</Section>
				<Section id="experience" index={3} total={5} title="Where I've been">
					<ExperienceRail onPickTech={pickTech} />
				</Section>
				<Section id="projects" index={4} total={5} title="Things I've made">
					<ProjectLedger />
				</Section>
				<Section id="contact" index={5} total={5} title="Say hi">
					<Contact />
				</Section>
			</main>
			<Footer activeIndex={activeIndex} total={sections.length} />
			<ProgressRail sections={sections} activeId={activeId} />
		</>
	);
}
