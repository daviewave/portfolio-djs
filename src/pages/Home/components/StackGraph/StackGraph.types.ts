import type { ForceGraphData, ForceNode } from "@/lib/graph";

export type GraphMode = "2d" | "3d";

export interface StackGraphProps {
	className?: string;
	selectedId?: string | null;
	onSelect?: (id: string) => void;
}

export interface GraphPalette {
	canvas: string;
	ink: string;
	muted: string;
	line: string;
	accent: string;
	areas: Record<string, string>;
}

export interface GraphSize {
	width: number;
	height: number;
}

export interface GraphCanvasProps {
	data: ForceGraphData;
	palette: GraphPalette;
	size: GraphSize;
	selectedId: string | null;
	reduced: boolean;
	visible: boolean;
	onSelect?: (id: string) => void;
}

export type SelectableNode = ForceNode;
