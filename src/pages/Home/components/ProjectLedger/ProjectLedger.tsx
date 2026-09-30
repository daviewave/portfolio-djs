import { projects } from "@/content";
import { cn } from "@/lib/utils";
import { areaTextStyles } from "../../Home.styles";
import { ledgerStyles } from "./ProjectLedger.styles";

export function ProjectLedger() {
	return (
		<ul className={ledgerStyles.list}>
			{projects.map((project) => (
				<li key={project.title} className={ledgerStyles.row}>
					<h3 className={ledgerStyles.title}>
						<a href={project.url} className={ledgerStyles.titleLink}>
							{project.title}
						</a>
					</h3>
					<div>
						<p className={ledgerStyles.description}>{project.description}</p>
						<p className={ledgerStyles.meta}>
							<span className="font-mono">{project.kind}</span>
							<span className={cn(areaTextStyles[project.area], "ml-[1rem]")}>
								{project.tags.join(", ")}
							</span>
						</p>
					</div>
					<a href={project.url} className={ledgerStyles.codeLink}>
						View code
						<span className="sr-only"> for {project.title}</span>
					</a>
				</li>
			))}
		</ul>
	);
}
