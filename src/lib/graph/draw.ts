import type { Area } from "@/content/types";
import { type Graph, type GraphLink, type GraphNode, isHub } from "./build";

export interface Palette {
	canvas?: string;
	accent?: string;
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
	selected?: string;
	pointer?: { x: number; y: number } | null;
	labelFont: string;
}

const LABEL_REVEAL_DISTANCE = 120;
const SMALL_NODE_RADIUS = 4 + 1 * 2.5;
const LABEL_GAP = 6;
const HOVER_RING = 2;
const LINK_ALPHA = 0.35;
const GLOW_BLUR = 18;
const HUB_LINK_ALPHA = 0.22;

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
	ctx.globalAlpha = highlighted
		? 1
		: link.kind === "hub"
			? HUB_LINK_ALPHA
			: LINK_ALPHA;
	ctx.strokeStyle = highlighted
		? options.palette.areas[source.area]
		: link.kind === "hub"
			? options.palette.areas[(link.source as GraphNode).area]
			: options.palette.muted;
	ctx.lineWidth = highlighted ? 1.5 : 1;
	ctx.beginPath();
	ctx.moveTo(source.x ?? 0, source.y ?? 0);
	ctx.lineTo(target.x ?? 0, target.y ?? 0);
	ctx.stroke();
};

const emphasized = (node: GraphNode, options: DrawOptions) =>
	node.id === options.hovered || node.id === options.selected;

const drawHub = (
	ctx: CanvasRenderingContext2D,
	node: GraphNode,
	options: DrawOptions,
) => {
	ctx.globalAlpha = 1;
	ctx.fillStyle = options.palette.canvas ?? options.palette.ink;
	ctx.strokeStyle = options.palette.areas[node.area];
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(node.x ?? 0, node.y ?? 0, node.radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(node.x ?? 0, node.y ?? 0, node.radius * 0.35, 0, Math.PI * 2);
	ctx.fillStyle = options.palette.areas[node.area];
	ctx.fill();
};

const drawNode = (
	ctx: CanvasRenderingContext2D,
	node: GraphNode,
	options: DrawOptions,
) => {
	if (isHub(node)) {
		drawHub(ctx, node, options);
		return;
	}
	ctx.globalAlpha = 1;
	ctx.fillStyle = options.palette.areas[node.area];
	ctx.beginPath();
	ctx.arc(node.x ?? 0, node.y ?? 0, node.radius, 0, Math.PI * 2);
	ctx.fill();
	if (!emphasized(node, options)) return;
	if (options.palette.accent) {
		ctx.shadowBlur = GLOW_BLUR;
		ctx.shadowColor = options.palette.accent;
		ctx.fill();
		ctx.shadowBlur = 0;
	}
	ctx.strokeStyle = options.palette.accent ?? options.palette.ink;
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
	isHub(node) ||
	node.radius > SMALL_NODE_RADIUS ||
	node.id === options.selected ||
	node.id === options.hovered ||
	nearPointer(node, options.pointer);

const drawLabel = (
	ctx: CanvasRenderingContext2D,
	node: GraphNode,
	options: DrawOptions,
) => {
	if (!labelVisible(node, options)) return;
	ctx.globalAlpha = 1;
	ctx.font = isHub(node)
		? options.labelFont.replace(/^\d+/, "600")
		: options.labelFont;
	ctx.textBaseline = "middle";
	const width = ctx.measureText(node.label).width;
	const rightEdge = (node.x ?? 0) + node.radius + LABEL_GAP + width;
	const x =
		rightEdge > options.width
			? (node.x ?? 0) - node.radius - LABEL_GAP - width
			: (node.x ?? 0) + node.radius + LABEL_GAP;
	const y = node.y ?? 0;
	if (options.palette.canvas) {
		ctx.lineWidth = 3;
		ctx.lineJoin = "round";
		ctx.strokeStyle = options.palette.canvas;
		ctx.strokeText(node.label, x, y);
	}
	ctx.fillStyle = isHub(node)
		? options.palette.areas[node.area]
		: emphasized(node, options)
			? options.palette.ink
			: options.palette.muted;
	ctx.fillText(node.label, x, y);
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
