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
import type { Graph, GraphLink, GraphNode } from "./build";

export interface Bounds {
	width: number;
	height: number;
}

export interface GraphSimulation extends Simulation<GraphNode, GraphLink> {
	bounds: Bounds;
}

const COUSE_DISTANCE = 72;
const AREA_DISTANCE = 120;
const COUSE_STRENGTH = 0.7;
const AREA_STRENGTH = 0.15;
const CHARGE = -110;
const COLLIDE_PADDING = 14;
const CENTERING = { x: 0.012, y: 0.02 };
const DEFAULT_SETTLE_TICKS = 300;

const linkDistance = (link: GraphLink) =>
	link.kind === "couse" ? COUSE_DISTANCE : AREA_DISTANCE;
const linkStrength = (link: GraphLink) =>
	link.kind === "couse" ? COUSE_STRENGTH : AREA_STRENGTH;

export const createSimulation = (
	graph: Graph,
	width: number,
	height: number,
): GraphSimulation => {
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
		.force("x", forceX<GraphNode>(width / 2).strength(CENTERING.x))
		.force("y", forceY<GraphNode>(height / 2).strength(CENTERING.y))
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
	(simulation.force("x") as ForceX<GraphNode>).x(width / 2);
	(simulation.force("y") as ForceY<GraphNode>).y(height / 2);
	clampToBounds(simulation.nodes(), simulation.bounds);
};
