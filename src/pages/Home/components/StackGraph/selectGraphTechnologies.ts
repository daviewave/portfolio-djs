import type { Technology } from "@/content";

const MAX_NODES = 28;

export const selectGraphTechnologies = (all: Technology[]) => {
	const prominent = all.filter((technology) => technology.weight >= 2);
	const remaining = all.filter((technology) => technology.weight < 2);
	return [...prominent, ...remaining].slice(0, MAX_NODES);
};
