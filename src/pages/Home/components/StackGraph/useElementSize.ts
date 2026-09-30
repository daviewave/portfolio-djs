import { type RefObject, useEffect, useState } from "react";
import type { GraphSize } from "./StackGraph.types";

const measure = (element: HTMLElement): GraphSize => {
	const rect = element.getBoundingClientRect();
	return { width: Math.round(rect.width), height: Math.round(rect.height) };
};

export const useElementSize = (ref: RefObject<HTMLElement | null>) => {
	const [size, setSize] = useState<GraphSize>({ width: 0, height: 0 });
	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		setSize(measure(element));
		const observer = new ResizeObserver(() => setSize(measure(element)));
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref]);
	return size;
};
