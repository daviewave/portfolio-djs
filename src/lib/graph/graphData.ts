import type { Area } from "@/content/types";
import type { Graph, NodeKind } from "./build";

export interface ForceNode {
	id: string;
	kind: NodeKind;
	area: Area;
	label: string;
	radius: number;
	x?: number;
	y?: number;
	z?: number;
	vz?: number;
}

export interface ForceLink {
	source: string | ForceNode;
	target: string | ForceNode;
	kind: "couse" | "area" | "hub";
}

export interface ForceGraphData {
	nodes: ForceNode[];
	links: ForceLink[];
}

const endpointId = (endpoint: unknown) =>
	typeof endpoint === "object" && endpoint !== null
		? String((endpoint as { id: string }).id)
		: String(endpoint);

export const toGraphData = (graph: Graph): ForceGraphData => ({
	nodes: graph.nodes.map(({ id, kind, area, label, radius }) => ({
		id,
		kind,
		area,
		label,
		radius,
	})),
	links: graph.links.map((link) => ({
		source: endpointId(link.source),
		target: endpointId(link.target),
		kind: link.kind,
	})),
});

export const linkEndpoint = (
	endpoint: ForceLink["source"],
): ForceNode | null => (typeof endpoint === "object" ? endpoint : null);
