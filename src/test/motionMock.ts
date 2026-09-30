import { createElement, forwardRef } from "react";

const plain = (tag: string) =>
	forwardRef((props: Record<string, unknown>, ref) => {
		const { initial, whileInView, viewport, transition, style, ...rest } =
			props;
		return createElement(tag, { ...rest, ref });
	});

export const m = {
	div: plain("div"),
	li: plain("li"),
	section: plain("section"),
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
