import type { ReactNode } from "react";
import type { Theme } from "@/lib/theme";

export interface ThemeOrigin {
	x: number;
	y: number;
}

export interface ThemeContextValue {
	theme: Theme;
	toggle: (origin?: ThemeOrigin) => void;
}

export interface ThemeProviderProps {
	children: ReactNode;
}
