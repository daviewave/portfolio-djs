import { lazy, Suspense, useMemo, useRef } from "react";
import { areas, technologies } from "@/content";
import { buildGraph, toGraphData } from "@/lib/graph";
import { useMotionPreference } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GraphCanvas2D } from "./GraphCanvas2D";
import { GraphModeToggle } from "./GraphModeToggle";
import type { StackGraphProps } from "./StackGraph.types";
import { selectGraphTechnologies } from "./selectGraphTechnologies";
import { TechnologyList } from "./TechnologyList";
import { useElementSize } from "./useElementSize";
import { useGraphMode } from "./useGraphMode";
import { useGraphPalette } from "./useGraphPalette";
import { useVisibility } from "./useVisibility";

const GraphCanvas3D = lazy(() => import("./GraphCanvas3D"));

const GRAPH_LABEL =
	"Graph of the technologies I work with, clustered around one hub per area";
const BOX =
	"relative h-[20rem] w-full min-w-0 touch-pan-y md:aspect-[16/9] md:h-auto md:min-h-[18rem]";

export function StackGraph({
	className,
	selectedId = null,
	onSelect,
}: StackGraphProps) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const { reduced } = useMotionPreference();
	const { mode, choose } = useGraphMode();
	const palette = useGraphPalette(wrapperRef);
	const size = useElementSize(wrapperRef);
	const visible = useVisibility(wrapperRef);
	const data = useMemo(
		() => toGraphData(buildGraph(selectGraphTechnologies(technologies), areas)),
		[],
	);
	const canvasProps = {
		data,
		palette,
		size,
		selectedId,
		reduced,
		visible,
		onSelect,
	};

	return (
		<div className={className}>
			<div className="mb-[0.75rem] flex items-center justify-end">
				<GraphModeToggle mode={mode} onChange={choose} />
			</div>
			<figure aria-label={GRAPH_LABEL} className="m-0 min-w-0 max-w-full">
				<div
					ref={wrapperRef}
					data-graph-mode={mode}
					className={cn(BOX, "overflow-hidden")}
				>
					{size.width > 0 && mode === "2d" && (
						<GraphCanvas2D {...canvasProps} />
					)}
					{size.width > 0 && mode === "3d" && (
						<Suspense fallback={<div className="h-full w-full" />}>
							<GraphCanvas3D {...canvasProps} />
						</Suspense>
					)}
				</div>
			</figure>
			<TechnologyList selectedId={selectedId} onSelect={onSelect} />
		</div>
	);
}
