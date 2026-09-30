export type Area = "backend" | "frontend" | "ai" | "infra";

export interface AreaInfo {
	id: Area;
	label: string;
	token: string;
}

export interface Technology {
	id: string;
	label: string;
	area: Area;
	weight: 1 | 2 | 3;
	links: string[];
}

export interface TechnologyDetail {
	summary: string;
	usedIn: string[];
}

export interface Role {
	year: string;
	title: string;
	org: string;
	summary: string;
	area: Area;
	highlights: string[];
	tech: string[];
}

export interface Project {
	title: string;
	description: string;
	kind: string;
	area: Area;
	tags: string[];
	url: string;
}

export interface Profile {
	name: string;
	role: string;
	location: string;
	intro: string[];
	email: string;
	resumePath: string;
	github: string;
	linkedin: string;
}
