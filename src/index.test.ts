import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

const channel = (hex: string, offset: number) => {
	const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
	return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex: string) =>
	0.2126 * channel(hex, 1) +
	0.7152 * channel(hex, 3) +
	0.0722 * channel(hex, 5);
const contrast = (a: string, b: string) => {
	const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (light + 0.05) / (dark + 0.05);
};
const tokensIn = (block: string) =>
	Object.fromEntries(
		[...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/g)].map((m) => [
			m[1],
			m[2],
		]),
	);
const blockFor = (selector: string) => {
	const start = css.indexOf(selector);
	return css.slice(start, css.indexOf("}", start));
};

describe.each([
	["light", ":root {"],
	["dark", '[data-theme="dark"] {'],
])("%s theme", (_name, selector) => {
	const tokens = tokensIn(blockFor(selector));
	test.each([
		"area-backend",
		"area-frontend",
		"area-ai",
		"area-infra",
		"muted",
	])("%s reads at AA contrast on the canvas", (token) => {
		expect(contrast(tokens[token], tokens.canvas)).toBeGreaterThanOrEqual(4.5);
	});
	test("ink reads at AAA contrast on the canvas", () => {
		expect(contrast(tokens.ink, tokens.canvas)).toBeGreaterThanOrEqual(7);
	});
});
