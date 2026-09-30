import { useRef } from "react";
import { areas, technologies } from "@/content";
import { useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { StackGraphProps } from "./StackGraph.types";
import { useGraphLoop } from "./useGraphLoop";

const GRAPH_LABEL =
	"Graph of the technologies I work with, clustered around one hub per area";

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

const TechnologyList = ({
	selectedId,
	onSelect,
}: Pick<StackGraphProps, "selectedId" | "onSelect">) => (
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

export function StackGraph({
	className,
	selectedId = null,
	onSelect,
}: StackGraphProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const preference = useMotionPreference();
	useGraphLoop(canvasRef, wrapperRef, preference, { selectedId, onSelect });

	return (
		<div className={className}>
			<div
				ref={wrapperRef}
				className="relative aspect-[16/9] min-h-[18rem] w-full"
			>
				<canvas
					ref={canvasRef}
					role="img"
					aria-label={GRAPH_LABEL}
					className="block h-full w-full touch-pan-y"
				/>
			</div>
			<TechnologyList selectedId={selectedId} onSelect={onSelect} />
		</div>
	);
}
