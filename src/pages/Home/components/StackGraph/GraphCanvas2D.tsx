import { useCallback, useRef } from "react";
import ForceGraph2D, {
	type ForceGraphMethods,
	type NodeObject,
} from "react-force-graph-2d";
import type { ForceLink, ForceNode } from "@/lib/graph";
import { linkColorFor, paintNode, paintPointerArea } from "./canvasPainters";
import type { GraphCanvasProps } from "./StackGraph.types";
import { useGraphForces } from "./useGraphForces";

const TRANSPARENT = "rgba(0,0,0,0)";
const FIT_MS = 400;
const FIT_PADDING = 24;

type Methods = ForceGraphMethods<NodeObject<ForceNode>, ForceLink>;

export function GraphCanvas2D({
	data,
	palette,
	size,
	selectedId,
	reduced,
	visible,
	onSelect,
}: GraphCanvasProps) {
	const ref = useRef<Methods | undefined>(undefined);
	const hovered = useRef<string | null>(null);
	useGraphForces(ref, data, size, 2, visible);

	const paint = useCallback(
		(
			node: NodeObject<ForceNode>,
			ctx: CanvasRenderingContext2D,
			scale: number,
		) =>
			paintNode(node, ctx, scale, {
				palette,
				selectedId,
				hoveredId: hovered.current,
			}),
		[palette, selectedId],
	);

	return (
		<ForceGraph2D<ForceNode, ForceLink>
			ref={ref}
			graphData={data}
			width={size.width}
			height={size.height}
			backgroundColor={TRANSPARENT}
			nodeLabel={() => ""}
			nodeCanvasObject={paint}
			nodePointerAreaPaint={paintPointerArea}
			linkColor={(link) => linkColorFor(link, palette)}
			linkWidth={1}
			warmupTicks={reduced ? 200 : 0}
			cooldownTicks={reduced ? 0 : undefined}
			d3VelocityDecay={0.4}
			enableNodeDrag={!reduced}
			showPointerCursor={(node) =>
				!!node && (node as ForceNode).kind === "tech"
			}
			onNodeHover={(node) => {
				hovered.current = node?.id ?? null;
			}}
			onNodeClick={(node) => {
				if (node.kind === "tech") onSelect?.(node.id);
			}}
			onEngineStop={() => ref.current?.zoomToFit(FIT_MS, FIT_PADDING)}
		/>
	);
}
