export interface RailSection {
	id: string;
	label: string;
}

export interface ProgressRailProps {
	sections: RailSection[];
	activeId: string | null;
}
