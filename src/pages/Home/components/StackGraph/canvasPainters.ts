import { type ForceLink, type ForceNode, linkEndpoint } from "@/lib/graph";
import type { GraphPalette } from "./StackGraph.types";

const LABEL_FONT = "500 12px 'Recursive Variable', monospace";
const HUB_LABEL_FONT = "600 12px 'Recursive Variable', monospace";
const LABEL_GAP = 4;
const RING = 2;
const GLOW = 18;

export interface PaintState {
	palette: GraphPalette;
	selectedId: string | null;
	hoveredId: string | null;
}

const emphasized = (node: ForceNode, state: PaintState) =>
	node.id === state.selectedId || node.id === state.hoveredId;

const circle = (
	ctx: CanvasRenderingContext2D,
	node: ForceNode,
	radius: number,
) => {
	ctx.beginPath();
	ctx.arc(node.x ?? 0, node.y ?? 0, radius, 0, Math.PI * 2);
};

const paintHub = (
	ctx: CanvasRenderingContext2D,
	node: ForceNode,
	state: PaintState,
) => {
	const color = state.palette.areas[node.area];
	ctx.fillStyle = state.palette.canvas;
	ctx.strokeStyle = color;
	ctx.lineWidth = RING;
	circle(ctx, node, node.radius);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = color;
	circle(ctx, node, node.radius * 0.35);
	ctx.fill();
};

const paintTech = (
	ctx: CanvasRenderingContext2D,
	node: ForceNode,
	state: PaintState,
) => {
	ctx.fillStyle = state.palette.areas[node.area];
	circle(ctx, node, node.radius);
	ctx.fill();
	if (!emphasized(node, state)) return;
	ctx.shadowBlur = GLOW;
	ctx.shadowColor = state.palette.accent;
	ctx.fill();
	ctx.shadowBlur = 0;
	ctx.strokeStyle = state.palette.accent;
	ctx.lineWidth = RING;
	circle(ctx, node, node.radius + RING);
	ctx.stroke();
};

const paintLabel = (
	ctx: CanvasRenderingContext2D,
	node: ForceNode,
	state: PaintState,
	scale: number,
) => {
	const hub = node.kind === "hub";
	const small = node.radius < 9;
	if (small && !emphasized(node, state) && scale < 1.6) return;
	ctx.font = hub ? HUB_LABEL_FONT : LABEL_FONT;
	ctx.textBaseline = "middle";
	ctx.textAlign = "left";
	const x = (node.x ?? 0) + node.radius + LABEL_GAP;
	const y = node.y ?? 0;
	ctx.lineWidth = 3;
	ctx.lineJoin = "round";
	ctx.strokeStyle = state.palette.canvas;
	ctx.strokeText(node.label, x, y);
	ctx.fillStyle = hub
		? state.palette.areas[node.area]
		: emphasized(node, state)
			? state.palette.ink
			: state.palette.muted;
	ctx.fillText(node.label, x, y);
};

export const paintNode = (
	node: ForceNode,
	ctx: CanvasRenderingContext2D,
	scale: number,
	state: PaintState,
) => {
	ctx.globalAlpha = 1;
	if (node.kind === "hub") paintHub(ctx, node, state);
	else paintTech(ctx, node, state);
	paintLabel(ctx, node, state, scale);
};

export const paintPointerArea = (
	node: ForceNode,
	color: string,
	ctx: CanvasRenderingContext2D,
) => {
	ctx.fillStyle = color;
	circle(ctx, node, node.radius + 6);
	ctx.fill();
};

export const linkColorFor = (link: ForceLink, palette: GraphPalette) => {
	if (link.kind !== "hub") return palette.muted;
	const source = linkEndpoint(link.source);
	return source ? palette.areas[source.area] : palette.muted;
};
