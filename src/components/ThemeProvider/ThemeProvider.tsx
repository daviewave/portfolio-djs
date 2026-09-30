import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { switchThemeWithWipe, type Theme } from "@/lib/theme";
import type {
	ThemeContextValue,
	ThemeOrigin,
	ThemeProviderProps,
} from "./ThemeProvider.types";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const documentTheme = (): Theme =>
	document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const opposite = (theme: Theme): Theme => (theme === "dark" ? "light" : "dark");

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		setTheme(documentTheme());
	}, []);

	const toggle = useCallback(
		(origin?: ThemeOrigin) => {
			const next = opposite(theme);
			setTheme(next);
			void switchThemeWithWipe(next, origin);
		},
		[theme],
	);

	const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export const useTheme = (): ThemeContextValue => {
	const value = useContext(ThemeContext);
	if (!value) throw new Error("useTheme must be used within a ThemeProvider");
	return value;
};
