export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

const isTheme = (value: unknown): value is Theme =>
	value === "light" || value === "dark";

const storedTheme = (): Theme | null => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return isTheme(stored) ? stored : null;
	} catch {
		return null;
	}
};

const systemTheme = (): Theme =>
	matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const readTheme = (): Theme => storedTheme() ?? systemTheme();

export const applyTheme = (theme: Theme): void => {
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		// Private browsing or blocked storage: the attribute alone is enough for this visit.
	}
};
