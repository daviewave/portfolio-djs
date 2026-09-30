import { type RefObject, useEffect } from "react";
import type { GraphLink } from "@/lib/graph";
import {
	CHARGE,
	type ForceGraphData,
	type ForceLink,
	hierarchyCollide,
	hierarchyForceX,
	hierarchyForceY,
	linkDistance,
	slabForceZ,
} from "@/lib/graph";
import type { GraphSize } from "./StackGraph.types";

interface ForceHandle {
	d3Force: (name: string, force?: unknown) => unknown;
	pauseAnimation: () => unknown;
	resumeAnimation: () => unknown;
}

interface ChainableForce {
	strength?: (value: number) => unknown;
	distance?: (accessor: (link: ForceLink) => number) => unknown;
}

const LAYOUT_SCALE = 0.85;

const layoutExtent = (size: GraphSize, dimensions: 2 | 3) =>
	dimensions === 3
		? { width: 240, height: 150 }
		: { width: size.width * LAYOUT_SCALE, height: size.height * LAYOUT_SCALE };

const applyForces = (
	handle: ForceHandle,
	data: ForceGraphData,
	size: GraphSize,
	dimensions: 2 | 3,
) => {
	const extent = layoutExtent(size, dimensions);
	handle.d3Force("x", hierarchyForceX(data.nodes, extent));
	handle.d3Force("y", hierarchyForceY(data.nodes, extent));
	handle.d3Force("collide", hierarchyCollide());
	if (dimensions === 3) handle.d3Force("z", slabForceZ());
	(handle.d3Force("charge") as ChainableForce | undefined)?.strength?.(CHARGE);
	(handle.d3Force("link") as ChainableForce | undefined)?.distance?.((link) =>
		linkDistance(link as unknown as GraphLink),
	);
};

export const useGraphForces = (
	ref: RefObject<ForceHandle | undefined>,
	data: ForceGraphData,
	size: GraphSize,
	dimensions: 2 | 3,
	visible: boolean,
) => {
	useEffect(() => {
		const handle = ref.current;
		if (!handle || size.width === 0) return;
		applyForces(handle, data, size, dimensions);
	}, [ref, data, size, dimensions]);

	useEffect(() => {
		const handle = ref.current;
		if (!handle) return;
		if (visible) handle.resumeAnimation();
		else handle.pauseAnimation();
	}, [ref, visible]);
};
