import { useCallback, useRef } from "react";
import ForceGraph3D, {
	type ForceGraphMethods,
	type NodeObject,
} from "react-force-graph-3d";
import type { ForceLink, ForceNode } from "@/lib/graph";
import { linkColorFor } from "./canvasPainters";
import type { GraphCanvasProps } from "./StackGraph.types";
import { nodeObject } from "./threeObjects";
import { useGraphForces } from "./useGraphForces";

const TRANSPARENT = "rgba(0,0,0,0)";
const FIT_MS = 600;
const FIT_PADDING = 20;

type Methods = ForceGraphMethods<NodeObject<ForceNode>, ForceLink>;

// Selection changes hand the library a new nodeThreeObject accessor, which
// rebuilds every node object; that is the documented way to restyle nodes.
export default function GraphCanvas3D({
	data,
	palette,
	size,
	selectedId,
	reduced,
	visible,
	onSelect,
}: GraphCanvasProps) {
	const ref = useRef<Methods | undefined>(undefined);
	useGraphForces(ref, data, size, 3, visible);

	const build = useCallback(
		(node: NodeObject<ForceNode>) => nodeObject(node, { palette, selectedId }),
		[palette, selectedId],
	);

	return (
		<ForceGraph3D<ForceNode, ForceLink>
			ref={ref}
			graphData={data}
			width={size.width}
			height={size.height}
			backgroundColor={TRANSPARENT}
			showNavInfo={false}
			nodeLabel={() => ""}
			nodeThreeObject={build}
			nodeThreeObjectExtend={false}
			linkColor={(link) => linkColorFor(link, palette)}
			linkOpacity={0.35}
			warmupTicks={reduced ? 200 : 0}
			cooldownTicks={reduced ? 0 : undefined}
			d3VelocityDecay={0.4}
			enableNodeDrag={!reduced}
			enableNavigationControls
			enablePointerInteraction
			onNodeClick={(node) => {
				if (node.kind === "tech") onSelect?.(node.id);
			}}
			onEngineStop={() => ref.current?.zoomToFit(FIT_MS, FIT_PADDING)}
		/>
	);
}
