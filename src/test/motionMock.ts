import { createElement, forwardRef } from "react";

const MOTION_PROPS = new Set([
	"initial",
	"animate",
	"exit",
	"variants",
	"whileInView",
	"whileHover",
	"viewport",
	"transition",
	"layout",
	"layoutId",
]);

const plain = (tag: string) =>
	forwardRef((props: Record<string, unknown>, ref) => {
		const rest = Object.fromEntries(
			Object.entries(props).filter(
				([key]) => !MOTION_PROPS.has(key) && key !== "style",
			),
		);
		return createElement(tag, { ...rest, ref });
	});

export const m = {
	div: plain("div"),
	li: plain("li"),
	section: plain("section"),
	p: plain("p"),
	span: plain("span"),
	h1: plain("h1"),
	h2: plain("h2"),
	h3: plain("h3"),
	ul: plain("ul"),
	a: plain("a"),
};
export const LazyMotion = ({ children }: { children: unknown }) => children;
export const domAnimation = {};
export const useInView = () => true;
export const useScroll = () => ({ scrollYProgress: 0 });
export const animate = (
	_from: number,
	to: number,
	options: { onUpdate?: (value: number) => void },
) => {
	options.onUpdate?.(to);
	return { stop: vi.fn() };
};
