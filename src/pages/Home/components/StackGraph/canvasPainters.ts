import { type ForceLink, type ForceNode, linkEndpoint } from "@/lib/graph";
import type { GraphPalette } from "./StackGraph.types";

const LABEL_FAMILY = "'Recursive Variable', monospace";
const LABEL_SIZE = 12;
const LABEL_GAP = 4;
const LABEL_HALO = 3;
// Below this zoom only hubs and the heaviest nodes keep a label, so a phone
// sized canvas stays readable; the rest appear on hover or selection.
const SPARSE_SCALE = 0.75;
const PROMINENT_RADIUS = 11;
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

const labelHidden = (node: ForceNode, state: PaintState, scale: number) => {
	if (node.kind === "hub" || emphasized(node, state)) return false;
	if (node.radius < 9) return scale < 1.6;
	return scale < SPARSE_SCALE && node.radius < PROMINENT_RADIUS;
};

// Labels hold their on-screen size when the graph is zoomed out to fit, and
// face the centre so the outer clusters never run off the canvas edge.
const paintLabel = (
	ctx: CanvasRenderingContext2D,
	node: ForceNode,
	state: PaintState,
	scale: number,
) => {
	if (labelHidden(node, state, scale)) return;
	const hub = node.kind === "hub";
	const unit = 1 / Math.min(scale, 1);
	const inward = (node.x ?? 0) > 0;
	const offset = node.radius + LABEL_GAP * unit;
	ctx.font = `${hub ? 600 : 500} ${LABEL_SIZE * unit}px ${LABEL_FAMILY}`;
	ctx.textBaseline = "middle";
	ctx.textAlign = inward ? "right" : "left";
	const x = (node.x ?? 0) + (inward ? -offset : offset);
	const y = node.y ?? 0;
	ctx.lineWidth = LABEL_HALO * unit;
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
