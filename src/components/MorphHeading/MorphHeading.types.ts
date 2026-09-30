import type { ReactNode } from "react";

export interface MorphHeadingProps {
	children: ReactNode;
	id?: string;
	level?: 1 | 2;
	className?: string;
}
