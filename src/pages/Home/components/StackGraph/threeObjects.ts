import * as THREE from "three";
import SpriteText from "three-spritetext";
import type { ForceNode } from "@/lib/graph";
import type { GraphPalette } from "./StackGraph.types";

const LABEL_HEIGHT = 3;
const LABEL_OFFSET = 1.6;

export interface ThreeState {
	palette: GraphPalette;
	selectedId: string | null;
}

const sphere = (radius: number, color: string) =>
	new THREE.Mesh(
		new THREE.SphereGeometry(radius, 24, 16),
		new THREE.MeshLambertMaterial({ color }),
	);

const ring = (radius: number, color: string) =>
	new THREE.Mesh(
		new THREE.TorusGeometry(radius, 0.5, 8, 48),
		new THREE.MeshBasicMaterial({ color }),
	);

const label = (node: ForceNode, color: string, radius: number) => {
	const sprite = new SpriteText(node.label, LABEL_HEIGHT, color);
	sprite.fontFace = "Recursive Variable, monospace";
	sprite.fontWeight = node.kind === "hub" ? "600" : "500";
	sprite.position.set(0, radius + LABEL_OFFSET + LABEL_HEIGHT / 2, 0);
	return sprite;
};

export const nodeObject = (node: ForceNode, state: ThreeState) => {
	const group = new THREE.Group();
	const areaColor = state.palette.areas[node.area];
	const selected = node.id === state.selectedId;
	const radius = node.radius * 0.6;
	if (node.kind === "hub") {
		group.add(sphere(radius * 0.4, areaColor));
		group.add(ring(radius, areaColor));
		group.add(label(node, areaColor, radius));
		return group;
	}
	group.add(sphere(radius, selected ? state.palette.accent : areaColor));
	if (selected) group.add(ring(radius + 1.5, state.palette.accent));
	group.add(
		label(node, selected ? state.palette.ink : state.palette.muted, radius),
	);
	return group;
};
