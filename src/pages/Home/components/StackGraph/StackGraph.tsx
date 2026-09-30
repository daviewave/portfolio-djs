import { useRef } from "react";
import { areas, technologies } from "@/content";
import { useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { StackGraphProps } from "./StackGraph.types";
import { useGraphLoop } from "./useGraphLoop";

const GRAPH_LABEL = "Graph of the technologies I work with, grouped by area";

const TechnologyList = () => (
	<ul className="sr-only">
		{areas.map((area) => (
			<li key={area.id}>
				{area.label}
				<ul>
					{technologies
						.filter((technology) => technology.area === area.id)
						.map((technology) => (
							<li key={technology.id}>{technology.label}</li>
						))}
				</ul>
			</li>
		))}
	</ul>
);

export function StackGraph({ className }: StackGraphProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const preference = useMotionPreference();
	useGraphLoop(canvasRef, wrapperRef, preference);

	return (
		<div
			ref={wrapperRef}
			className={cn("relative aspect-[16/9] min-h-[18rem] w-full", className)}
		>
			<canvas
				ref={canvasRef}
				role="img"
				aria-label={GRAPH_LABEL}
				className="block h-full w-full touch-pan-y"
			/>
			<TechnologyList />
		</div>
	);
}
