import type { Area } from "@/content/types";
import type { Graph, GraphLink, GraphNode } from "./build";

export interface Palette {
	ink: string;
	muted: string;
	line: string;
	areas: Record<Area, string>;
}

export interface DrawOptions {
	width: number;
	height: number;
	dpr: number;
	palette: Palette;
	hovered?: string;
	pointer?: { x: number; y: number } | null;
	labelFont: string;
}

const LABEL_REVEAL_DISTANCE = 120;
const SMALL_NODE_RADIUS = 4 + 1 * 2.5;
const LABEL_GAP = 6;
const HOVER_RING = 2;
const LINK_ALPHA = 0.5;

const nodeOf = (end: GraphLink["source"]) => end as GraphNode;

const touchesHovered = (link: GraphLink, hovered?: string) =>
	hovered !== undefined &&
	(nodeOf(link.source).id === hovered || nodeOf(link.target).id === hovered);

const drawLink = (
	ctx: CanvasRenderingContext2D,
	link: GraphLink,
	options: DrawOptions,
) => {
	const source = nodeOf(link.source);
	const target = nodeOf(link.target);
	const highlighted = touchesHovered(link, options.hovered);
	ctx.globalAlpha = highlighted ? 1 : LINK_ALPHA;
	ctx.strokeStyle = highlighted
		? options.palette.areas[source.area]
		: options.palette.line;
	ctx.lineWidth = highlighted ? 1.5 : 1;
	ctx.beginPath();
	ctx.moveTo(source.x ?? 0, source.y ?? 0);
	ctx.lineTo(target.x ?? 0, target.y ?? 0);
	ctx.stroke();
};

const drawNode = (
	ctx: CanvasRenderingContext2D,
	node: GraphNode,
	options: DrawOptions,
) => {
	const hovered = node.id === options.hovered;
	ctx.globalAlpha = 1;
	ctx.fillStyle = options.palette.areas[node.area];
	ctx.beginPath();
	ctx.arc(node.x ?? 0, node.y ?? 0, node.radius, 0, Math.PI * 2);
	ctx.fill();
	if (!hovered) return;
	ctx.strokeStyle = options.palette.ink;
	ctx.lineWidth = HOVER_RING;
	ctx.beginPath();
	ctx.arc(node.x ?? 0, node.y ?? 0, node.radius + HOVER_RING, 0, Math.PI * 2);
	ctx.stroke();
};

const nearPointer = (node: GraphNode, pointer: DrawOptions["pointer"]) =>
	pointer != null &&
	Math.hypot(pointer.x - (node.x ?? 0), pointer.y - (node.y ?? 0)) <=
		LABEL_REVEAL_DISTANCE;

const labelVisible = (node: GraphNode, options: DrawOptions) =>
	node.radius > SMALL_NODE_RADIUS ||
	node.id === options.hovered ||
	nearPointer(node, options.pointer);

const drawLabel = (
	ctx: CanvasRenderingContext2D,
	node: GraphNode,
	options: DrawOptions,
) => {
	if (!labelVisible(node, options)) return;
	ctx.globalAlpha = 1;
	ctx.font = options.labelFont;
	ctx.textBaseline = "middle";
	ctx.fillStyle =
		node.id === options.hovered ? options.palette.ink : options.palette.muted;
	ctx.fillText(
		node.label,
		(node.x ?? 0) + node.radius + LABEL_GAP,
		node.y ?? 0,
	);
};

export const drawGraph = (
	ctx: CanvasRenderingContext2D,
	graph: Graph,
	options: DrawOptions,
) => {
	ctx.setTransform(options.dpr, 0, 0, options.dpr, 0, 0);
	ctx.clearRect(0, 0, options.width, options.height);
	for (const link of graph.links) drawLink(ctx, link, options);
	for (const node of graph.nodes) drawNode(ctx, node, options);
	for (const node of graph.nodes) drawLabel(ctx, node, options);
};
