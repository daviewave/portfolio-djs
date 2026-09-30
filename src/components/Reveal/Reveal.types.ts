import type { ReactNode } from "react";

export type RevealTag = "div" | "li" | "section";

export interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	as?: RevealTag;
}
