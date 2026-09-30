import {
	type ForceCenter,
	type ForceX,
	type ForceY,
	forceCenter,
	forceCollide,
	forceLink,
	forceManyBody,
	forceSimulation,
	forceX,
	forceY,
	type Simulation,
} from "d3-force";
import { type Graph, type GraphLink, type GraphNode, isHub } from "./build";

export interface Bounds {
	width: number;
	height: number;
}

export interface GraphSimulation extends Simulation<GraphNode, GraphLink> {
	bounds: Bounds;
}

export const COUSE_DISTANCE = 90;
export const HUB_DISTANCE = 58;
const HUB_STRENGTH = 0.7;
export const HUB_ANCHOR = 0.35;
export const TECH_ANCHOR = 0.05;
const QUADRANTS: ReadonlyArray<readonly [number, number]> = [
	[0.27, 0.36],
	[0.73, 0.36],
	[0.27, 0.7],
	[0.73, 0.7],
];
const AREA_DISTANCE = 120;
const COUSE_STRENGTH = 0.25;
const AREA_STRENGTH = 0.15;
export const CHARGE = -110;
export const COLLIDE_PADDING = 14;
const CENTERING = { x: 0.012, y: 0.02 };
const DEFAULT_SETTLE_TICKS = 300;

export const linkDistance = (link: GraphLink) => {
	if (link.kind === "hub") return HUB_DISTANCE;
	return link.kind === "couse" ? COUSE_DISTANCE : AREA_DISTANCE;
};
export const linkStrength = (link: GraphLink) => {
	if (link.kind === "hub") return HUB_STRENGTH;
	return link.kind === "couse" ? COUSE_STRENGTH : AREA_STRENGTH;
};

export type Anchor = { x: number; y: number };

export const anchorsFor = (
	nodes: GraphNode[],
	width: number,
	height: number,
) => {
	const areasInOrder = [
		...new Set(nodes.filter(isHub).map((node) => node.area)),
	];
	const anchors = new Map<string, Anchor>();
	areasInOrder.forEach((area, index) => {
		const [fx, fy] = QUADRANTS[index % QUADRANTS.length];
		anchors.set(area, { x: width * fx, y: height * fy });
	});
	return anchors;
};

export const anchorX =
	(anchors: Map<string, Anchor>, width: number) => (node: GraphNode) =>
		anchors.get(node.area)?.x ?? width / 2;
export const anchorY =
	(anchors: Map<string, Anchor>, height: number) => (node: GraphNode) =>
		anchors.get(node.area)?.y ?? height / 2;
export const anchorStrength =
	(hasHubs: boolean, fallback: number) => (node: GraphNode) => {
		if (!hasHubs) return fallback;
		return isHub(node) ? HUB_ANCHOR : TECH_ANCHOR;
	};

export const createSimulation = (
	graph: Graph,
	width: number,
	height: number,
): GraphSimulation => {
	const anchors = anchorsFor(graph.nodes, width, height);
	const hasHubs = anchors.size > 0;
	const simulation = forceSimulation<GraphNode, GraphLink>(graph.nodes)
		.force(
			"link",
			forceLink<GraphNode, GraphLink>(graph.links)
				.id((node) => node.id)
				.distance(linkDistance)
				.strength(linkStrength),
		)
		.force("charge", forceManyBody().strength(CHARGE))
		.force("center", forceCenter(width / 2, height / 2))
		.force(
			"collide",
			forceCollide<GraphNode>((node) => node.radius + COLLIDE_PADDING),
		)
		.force(
			"x",
			forceX<GraphNode>(anchorX(anchors, width)).strength(
				anchorStrength(hasHubs, CENTERING.x),
			),
		)
		.force(
			"y",
			forceY<GraphNode>(anchorY(anchors, height)).strength(
				anchorStrength(hasHubs, CENTERING.y),
			),
		)
		.stop() as GraphSimulation;
	simulation.bounds = { width, height };
	return simulation;
};

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export const clampToBounds = (nodes: GraphNode[], bounds: Bounds) => {
	for (const node of nodes) {
		node.x = clamp(node.x ?? 0, node.radius, bounds.width - node.radius);
		node.y = clamp(node.y ?? 0, node.radius, bounds.height - node.radius);
	}
};

export const settle = (
	simulation: GraphSimulation,
	ticks = DEFAULT_SETTLE_TICKS,
) => {
	simulation.tick(ticks);
	clampToBounds(simulation.nodes(), simulation.bounds);
};

export const applyPointerForce = (
	nodes: GraphNode[],
	pointer: { x: number; y: number },
	radius: number,
	strength: number,
) => {
	for (const node of nodes) {
		const dx = pointer.x - (node.x ?? 0);
		const dy = pointer.y - (node.y ?? 0);
		const distance = Math.hypot(dx, dy);
		if (distance === 0 || distance > radius) continue;
		const falloff = 1 - distance / radius;
		node.vx = (node.vx ?? 0) + dx * falloff * strength;
		node.vy = (node.vy ?? 0) + dy * falloff * strength;
	}
};

export interface Point {
	x: number;
	y: number;
}

export interface AdvanceOptions {
	radius: number;
	strength: number;
	activeAlphaTarget: number;
}

export const advance = (
	simulation: GraphSimulation,
	pointer: Point | null,
	options: AdvanceOptions,
): boolean => {
	const resting = simulation.alpha() <= simulation.alphaMin();
	if (pointer) {
		simulation.alphaTarget(options.activeAlphaTarget);
		applyPointerForce(
			simulation.nodes(),
			pointer,
			options.radius,
			options.strength,
		);
	} else {
		simulation.alphaTarget(0);
	}
	if (!pointer && resting) return false;
	simulation.tick();
	clampToBounds(simulation.nodes(), simulation.bounds);
	return true;
};

export const refit = (
	simulation: GraphSimulation,
	width: number,
	height: number,
) => {
	const previous = simulation.bounds;
	for (const node of simulation.nodes()) {
		node.x = ((node.x ?? 0) * width) / previous.width;
		node.y = ((node.y ?? 0) * height) / previous.height;
	}
	simulation.bounds = { width, height };
	(simulation.force("center") as ForceCenter<GraphNode>)
		.x(width / 2)
		.y(height / 2);
	const anchors = anchorsFor(simulation.nodes(), width, height);
	(simulation.force("x") as ForceX<GraphNode>).x(anchorX(anchors, width));
	(simulation.force("y") as ForceY<GraphNode>).y(anchorY(anchors, height));
	clampToBounds(simulation.nodes(), simulation.bounds);
};

export const nodeAt = (
	simulation: GraphSimulation,
	point: Point,
	radius: number,
): GraphNode | undefined => {
	const hit = simulation.find(point.x, point.y, radius);
	return hit && !isHub(hit) ? hit : undefined;
};
