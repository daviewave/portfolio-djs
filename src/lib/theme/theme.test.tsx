import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { ThemeProvider, ThemeToggle, useTheme } from "@/components";
import {
	applyTheme,
	readTheme,
	switchThemeWithWipe,
	THEME_INIT_SCRIPT,
} from "@/lib/theme";
import indexHtml from "../../../index.html?raw";

const systemPrefersDark = (matches: boolean) => {
	vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
		matches: query.includes("prefers-color-scheme: dark") ? matches : false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}));
};

beforeEach(() => {
	localStorage.clear();
	delete document.documentElement.dataset.theme;
});

describe("readTheme", () => {
	test("stored theme wins over the system preference", () => {
		localStorage.setItem("theme", "light");
		systemPrefersDark(true);
		expect(readTheme()).toBe("light");
	});

	test("falls back to the system preference, then light", () => {
		systemPrefersDark(true);
		expect(readTheme()).toBe("dark");
		systemPrefersDark(false);
		expect(readTheme()).toBe("light");
	});

	test("ignores a corrupt stored value", () => {
		localStorage.setItem("theme", "sepia");
		expect(readTheme()).toBe("light");
	});
});

describe("applyTheme", () => {
	test("writes the attribute and storage", () => {
		applyTheme("dark");
		expect(document.documentElement.dataset.theme).toBe("dark");
		expect(localStorage.getItem("theme")).toBe("dark");
	});

	test("survives a storage that throws", () => {
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new Error("blocked");
		});
		expect(() => applyTheme("light")).not.toThrow();
		expect(document.documentElement.dataset.theme).toBe("light");
	});
});

describe("switchThemeWithWipe", () => {
	test("applies directly when the browser lacks view transitions", async () => {
		await switchThemeWithWipe("dark");
		expect(document.documentElement.dataset.theme).toBe("dark");
	});

	test("uses startViewTransition and animates the wipe when available", async () => {
		const finished = Promise.resolve();
		let animateOptions: number | KeyframeAnimationOptions | undefined;
		const animate = vi.fn(
			(
				_keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
				options?: number | KeyframeAnimationOptions,
			) => {
				animateOptions = options;
				return { finished } as unknown as Animation;
			},
		);
		document.documentElement.animate = animate;
		const startViewTransition = vi.fn((callback: () => void) => {
			callback();
			return { ready: Promise.resolve(), finished };
		});
		Object.defineProperty(document, "startViewTransition", {
			configurable: true,
			value: startViewTransition,
		});
		await switchThemeWithWipe("dark", { x: 10, y: 20 });
		expect(startViewTransition).toHaveBeenCalledOnce();
		expect(document.documentElement.dataset.theme).toBe("dark");
		expect(animate).toHaveBeenCalledOnce();
		expect(animateOptions).toMatchObject({
			pseudoElement: "::view-transition-new(root)",
		});
		Reflect.deleteProperty(document, "startViewTransition");
	});
});

describe("ThemeProvider and ThemeToggle", () => {
	test("useTheme throws outside its provider", () => {
		expect(() => renderHook(() => useTheme())).toThrow(
			"useTheme must be used within a ThemeProvider",
		);
	});

	test("adopts the theme chosen before hydration", () => {
		document.documentElement.dataset.theme = "dark";
		render(
			<ThemeProvider>
				<ThemeToggle />
			</ThemeProvider>,
		);
		expect(
			screen.getByRole("button", { name: "Switch to light theme" }),
		).toBeInTheDocument();
	});

	test("the toggle flips the attribute and its label", () => {
		render(
			<ThemeProvider>
				<ThemeToggle />
			</ThemeProvider>,
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Switch to dark theme" }),
		);
		expect(document.documentElement.dataset.theme).toBe("dark");
		expect(
			screen.getByRole("button", { name: "Switch to light theme" }),
		).toBeInTheDocument();
	});
});

test("index.html carries THEME_INIT_SCRIPT verbatim", () => {
	expect(indexHtml).toContain(THEME_INIT_SCRIPT);
});
