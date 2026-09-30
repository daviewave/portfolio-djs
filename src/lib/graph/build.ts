import type { SimulationLinkDatum, SimulationNodeDatum } from "d3-force";
import type { Area, AreaInfo, Technology } from "@/content/types";

export type NodeKind = "hub" | "tech";

export interface GraphNode extends SimulationNodeDatum {
	kind: NodeKind;
	id: string;
	label: string;
	area: Area;
	radius: number;
}

export interface GraphLink extends SimulationLinkDatum<GraphNode> {
	kind: "couse" | "area" | "hub";
}

export interface Graph {
	nodes: GraphNode[];
	links: GraphLink[];
}

const AREA_LINKS_FOR_ISOLATED = 2;
const HUB_RADIUS = 11;

export const hubId = (area: Area) => `hub:${area}`;
export const isHub = (node: GraphNode) => node.kind === "hub";

const radiusFor = (weight: Technology["weight"]) => 4 + weight * 2.5;

const toNode = (technology: Technology): GraphNode => ({
	kind: "tech",
	id: technology.id,
	label: technology.label,
	area: technology.area,
	radius: radiusFor(technology.weight),
});

const toHub = (area: AreaInfo): GraphNode => ({
	kind: "hub",
	id: hubId(area.id),
	label: area.label,
	area: area.id,
	radius: HUB_RADIUS,
});

const pairKey = (a: string, b: string) => [a, b].sort().join("\u0000");

const couseLinks = (technologies: Technology[]): GraphLink[] => {
	const known = new Set(technologies.map((t) => t.id));
	const seen = new Set<string>();
	const links: GraphLink[] = [];
	for (const technology of technologies) {
		for (const target of technology.links) {
			if (target === technology.id || !known.has(target)) continue;
			const key = pairKey(technology.id, target);
			if (seen.has(key)) continue;
			seen.add(key);
			links.push({ source: technology.id, target, kind: "couse" });
		}
	}
	return links;
};

const hubLinks = (
	technologies: Technology[],
	hubs: GraphNode[],
): GraphLink[] => {
	const present = new Set(hubs.map((hub) => hub.id));
	return technologies
		.filter((technology) => present.has(hubId(technology.area)))
		.map((technology) => ({
			source: technology.id,
			target: hubId(technology.area),
			kind: "hub" as const,
		}));
};

const endpoints = (link: GraphLink) => [
	link.source as string,
	link.target as string,
];

const areaLinksForIsolated = (
	nodes: GraphNode[],
	links: GraphLink[],
): GraphLink[] => {
	const linked = new Set(links.flatMap(endpoints));
	const seen = new Set(
		links.map((link) => pairKey(...(endpoints(link) as [string, string]))),
	);
	const extra: GraphLink[] = [];
	for (const node of nodes) {
		if (linked.has(node.id)) continue;
		const siblings = nodes.filter(
			(other) => other.area === node.area && other.id !== node.id,
		);
		for (const sibling of siblings.slice(0, AREA_LINKS_FOR_ISOLATED)) {
			const key = pairKey(node.id, sibling.id);
			if (seen.has(key)) continue;
			seen.add(key);
			linked.add(sibling.id);
			extra.push({ source: node.id, target: sibling.id, kind: "area" });
		}
		linked.add(node.id);
	}
	return extra;
};

export const buildGraph = (
	technologies: Technology[],
	hubAreas: AreaInfo[] = [],
): Graph => {
	const techNodes = technologies.map(toNode);
	const couse = couseLinks(technologies);
	if (hubAreas.length === 0) {
		return {
			nodes: techNodes,
			links: [...couse, ...areaLinksForIsolated(techNodes, couse)],
		};
	}
	const hubs = hubAreas.map(toHub);
	return {
		nodes: [...techNodes, ...hubs],
		links: [...hubLinks(technologies, hubs), ...couse],
	};
};
