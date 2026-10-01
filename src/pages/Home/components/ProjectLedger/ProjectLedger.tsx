import type { Project } from "@/content";
import { professionalProjects, projects } from "@/content";
import { cn } from "@/lib/utils";
import { areaDotStyles, areaTextStyles } from "../../Home.styles";
import { ledgerStyles } from "./ProjectLedger.styles";

const CardLinks = ({ project }: { project: Project }) =>
	project.url ? (
		<p className={ledgerStyles.links}>
			{project.liveUrl && (
				<a href={project.liveUrl} className={ledgerStyles.link}>
					Open site
					<span className="sr-only"> for {project.title}</span>
				</a>
			)}
			<a href={project.url} className={ledgerStyles.link}>
				View code
				<span className="sr-only"> for {project.title}</span>
			</a>
		</p>
	) : (
		<p className={ledgerStyles.closed}>Private code</p>
	);

const ProjectCard = ({
	project,
	featured,
}: {
	project: Project;
	featured: boolean;
}) => (
	<li className={ledgerStyles.card(featured, project.url !== undefined)}>
		<div>
			<p className={ledgerStyles.head}>
				<span className={ledgerStyles.kind}>
					<span
						aria-hidden="true"
						className={cn(ledgerStyles.dot, areaDotStyles[project.area])}
					/>
					{project.kind}
				</span>
				<span className={ledgerStyles.year}>{project.year}</span>
			</p>
			<h4 className={ledgerStyles.title(featured)}>
				{project.url ? (
					<a href={project.url} className={ledgerStyles.titleLink}>
						{project.title}
					</a>
				) : (
					project.title
				)}
			</h4>
			{project.org && <p className={ledgerStyles.org}>at {project.org}</p>}
			<p className={ledgerStyles.description}>{project.description}</p>
		</div>
		<ul
			className={ledgerStyles.highlights(featured)}
			aria-label={`What is in ${project.title}`}
		>
			{project.highlights.map((highlight) => (
				<li key={highlight.slice(0, 24)} className={ledgerStyles.highlight}>
					{highlight}
				</li>
			))}
		</ul>
		<div className={ledgerStyles.foot}>
			<p className={cn(ledgerStyles.tags, areaTextStyles[project.area])}>
				{project.tags.map((tag) => (
					<span key={tag}>{tag}</span>
				))}
			</p>
			<CardLinks project={project} />
		</div>
	</li>
);

const ProjectGroup = ({
	title,
	note,
	items,
}: {
	title: string;
	note: string;
	items: Project[];
}) => (
	<div>
		<h3 className={ledgerStyles.groupTitle}>{title}</h3>
		<p className={ledgerStyles.groupNote}>{note}</p>
		<ul className={ledgerStyles.list} aria-label={title}>
			{items.map((project, index) => (
				<ProjectCard
					key={project.title}
					project={project}
					featured={index === 0}
				/>
			))}
		</ul>
	</div>
);

export function ProjectLedger() {
	return (
		<div className={ledgerStyles.groups}>
			<ProjectGroup
				title="Professional projects"
				note="Products I built for employers and clients. The code is private, so each one is described here instead."
				items={professionalProjects}
			/>
			<ProjectGroup
				title="Personal projects"
				note="My own work, with the code open on GitHub."
				items={projects}
			/>
		</div>
	);
}
