import { forceCollide, forceX, forceY } from "d3-force";
import type { GraphNode } from "./build";
import type { ForceNode } from "./graphData";
import {
	anchorStrength,
	anchorsFor,
	anchorX,
	anchorY,
	COLLIDE_PADDING,
	HUB_ANCHOR,
	TECH_ANCHOR,
} from "./simulation";

export interface LayoutExtent {
	width: number;
	height: number;
}

const Z_STRENGTH = 0.08;

interface ZForce {
	(alpha: number): void;
	initialize: (nodes: ForceNode[]) => void;
}

const asGraphNodes = (nodes: ForceNode[]) => nodes as unknown as GraphNode[];

const centered = (extent: LayoutExtent) => {
	const nodesAt = (nodes: GraphNode[]) => {
		const anchors = anchorsFor(nodes, extent.width, extent.height);
		for (const anchor of anchors.values()) {
			anchor.x -= extent.width / 2;
			anchor.y -= extent.height / 2;
		}
		return anchors;
	};
	return nodesAt;
};

export const hierarchyForceX = (nodes: ForceNode[], extent: LayoutExtent) => {
	const graphNodes = asGraphNodes(nodes);
	const anchors = centered(extent)(graphNodes);
	return forceX<GraphNode>(anchorX(anchors, 0)).strength(
		anchorStrength(anchors.size > 0, 0.02),
	);
};

export const hierarchyForceY = (nodes: ForceNode[], extent: LayoutExtent) => {
	const graphNodes = asGraphNodes(nodes);
	const anchors = centered(extent)(graphNodes);
	return forceY<GraphNode>(anchorY(anchors, 0)).strength(
		anchorStrength(anchors.size > 0, 0.02),
	);
};

export const slabForceZ = (): ZForce => {
	let nodes: ForceNode[] = [];
	const force = ((alpha: number) => {
		for (const node of nodes) {
			node.vz = (node.vz ?? 0) - (node.z ?? 0) * Z_STRENGTH * alpha;
		}
	}) as ZForce;
	force.initialize = (next: ForceNode[]) => {
		nodes = next;
	};
	return force;
};

export const hierarchyCollide = () =>
	forceCollide<GraphNode>((node) => node.radius + COLLIDE_PADDING);

export const anchorStrengths = { hub: HUB_ANCHOR, tech: TECH_ANCHOR };
