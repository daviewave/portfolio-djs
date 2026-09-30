import { areas, technologies } from "@/content";
import { cn } from "@/lib/utils";
import type { StackGraphProps } from "./StackGraph.types";

const listStyles = {
	list: "sr-only focus-within:not-sr-only focus-within:mt-[1rem] focus-within:flex focus-within:flex-col focus-within:gap-[0.5rem]",
	group:
		"flex flex-wrap items-baseline gap-x-[0.75rem] gap-y-[0.25rem] font-mono text-[0.75rem] text-muted",
	button: (selected: boolean) =>
		cn(
			"rounded-[0.25rem] px-[0.25rem] hover:text-ink",
			selected && "text-accent",
		),
} as const;

type TechnologyListProps = Pick<StackGraphProps, "selectedId" | "onSelect">;

export function TechnologyList({ selectedId, onSelect }: TechnologyListProps) {
	return (
		<ul className={listStyles.list} aria-label="Technologies by area">
			{areas.map((area) => (
				<li key={area.id} className={listStyles.group}>
					<span className="text-ink">{area.label}</span>
					<ul className="contents">
						{technologies
							.filter((technology) => technology.area === area.id)
							.map((technology) => (
								<li key={technology.id}>
									<button
										type="button"
										className={listStyles.button(technology.id === selectedId)}
										aria-pressed={technology.id === selectedId}
										onClick={() => onSelect?.(technology.id)}
									>
										{technology.label}
									</button>
								</li>
							))}
					</ul>
				</li>
			))}
		</ul>
	);
}
