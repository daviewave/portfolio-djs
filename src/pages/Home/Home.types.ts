export interface SectionInfo {
	id: string;
	label: string;
}

export interface StickyPanelProps {
	sections: SectionInfo[];
	activeId: string | null;
}

export interface SectionProps {
	id: string;
	title: string;
	children: React.ReactNode;
}
