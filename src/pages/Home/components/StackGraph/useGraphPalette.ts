import { type RefObject, useEffect, useState } from "react";
import { areas } from "@/content";
import type { GraphPalette } from "./StackGraph.types";

const readPalette = (element: Element): GraphPalette => {
	const style = getComputedStyle(element);
	const token = (name: string) => style.getPropertyValue(name).trim();
	return {
		canvas: token("--canvas"),
		ink: token("--ink"),
		muted: token("--muted"),
		line: token("--line"),
		accent: token("--accent"),
		areas: Object.fromEntries(
			areas.map((area) => [area.id, token(area.token)]),
		),
	};
};

const EMPTY: GraphPalette = {
	canvas: "",
	ink: "",
	muted: "",
	line: "",
	accent: "",
	areas: {},
};

export const useGraphPalette = (ref: RefObject<HTMLElement | null>) => {
	const [palette, setPalette] = useState<GraphPalette>(EMPTY);
	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const refresh = () => setPalette(readPalette(element));
		refresh();
		const observer = new MutationObserver(refresh);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
		return () => observer.disconnect();
	}, [ref]);
	return palette;
};
