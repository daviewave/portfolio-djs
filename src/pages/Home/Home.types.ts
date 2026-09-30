import type { ReactNode } from "react";

export interface SectionInfo {
	id: string;
	label: string;
}

export interface SectionNavProps {
	sections: SectionInfo[];
	activeId: string | null;
	variant: "bar" | "chips";
}

export interface TopBarProps {
	sections: SectionInfo[];
	activeId: string | null;
}

export interface FooterProps {
	activeIndex: number;
	total: number;
}

export interface SectionProps {
	id: string;
	index: number;
	total: number;
	title: string;
	children: ReactNode;
}
