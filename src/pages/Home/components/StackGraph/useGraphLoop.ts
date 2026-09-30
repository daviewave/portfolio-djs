import { type RefObject, useEffect } from "react";
import { areas, technologies } from "@/content";
import type { Area, Technology } from "@/content/types";
import {
	advance,
	buildGraph,
	createSimulation,
	drawGraph,
	type GraphSimulation,
	type Palette,
	refit,
	settle,
} from "@/lib/graph";
import { createPointerStore, scheduler } from "@/lib/motion";

const MAX_NODES = 28;
const REFIT_SETTLE_TICKS = 60;
const REFIT_ALPHA = 0.25;
const INITIAL_SETTLE_TICKS = 120;
const STATIC_SETTLE_TICKS = 300;
const POINTER_RADIUS = 140;
const POINTER_STRENGTH = 0.025;
const HOVER_RADIUS = 24;
const ACTIVE_ALPHA_TARGET = 0.02;
const POINTER_OPTIONS = {
	radius: POINTER_RADIUS,
	strength: POINTER_STRENGTH,
	activeAlphaTarget: ACTIVE_ALPHA_TARGET,
};
const LABEL_FONT = "500 12px 'Recursive Variable', monospace";
const PASSIVE = { passive: true } as const;

interface Preference {
	reduced: boolean;
	finePointer: boolean;
}

interface CanvasSize {
	width: number;
	height: number;
	dpr: number;
}

interface Point {
	x: number;
	y: number;
}

export const selectGraphTechnologies = (all: Technology[]) => {
	const prominent = all.filter((technology) => technology.weight >= 2);
	const remaining = all.filter((technology) => technology.weight < 2);
	return [...prominent, ...remaining].slice(0, MAX_NODES);
};

const readPalette = (element: Element): Palette => {
	const style = getComputedStyle(element);
	const token = (name: string) => style.getPropertyValue(name).trim();
	const byArea = Object.fromEntries(
		areas.map((area) => [area.id, token(area.token)]),
	) as Record<Area, string>;
	return {
		canvas: token("--canvas"),
		ink: token("--ink"),
		muted: token("--muted"),
		line: token("--line"),
		areas: byArea,
	};
};

const measure = (wrapper: HTMLElement): CanvasSize => {
	const rect = wrapper.getBoundingClientRect();
	return {
		width: Math.max(1, rect.width),
		height: Math.max(1, rect.height),
		dpr: window.devicePixelRatio || 1,
	};
};

const sizeBackingStore = (canvas: HTMLCanvasElement, size: CanvasSize) => {
	canvas.width = Math.round(size.width * size.dpr);
	canvas.height = Math.round(size.height * size.dpr);
};

const toCanvasPoint = (canvas: HTMLCanvasElement, point: Point): Point => {
	const rect = canvas.getBoundingClientRect();
	return { x: point.x - rect.left, y: point.y - rect.top };
};

export const useGraphLoop = (
	canvasRef: RefObject<HTMLCanvasElement | null>,
	wrapperRef: RefObject<HTMLElement | null>,
	preference: Preference,
) => {
	const { reduced, finePointer } = preference;

	useEffect(() => {
		const canvas = canvasRef.current;
		const wrapper = wrapperRef.current;
		if (!canvas || !wrapper) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const graph = buildGraph(selectGraphTechnologies(technologies));
		const pointer = createPointerStore(canvas);
		let simulation: GraphSimulation | null = null;
		let palette = readPalette(canvas);
		let size = measure(wrapper);
		let stopLoop: (() => void) | null = null;
		let onScreen = true;

		const draw = (local: Point | null) => {
			if (!simulation) return;
			const hovered = local
				? simulation.find(local.x, local.y, HOVER_RADIUS)?.id
				: undefined;
			drawGraph(ctx, graph, {
				width: size.width,
				height: size.height,
				dpr: size.dpr,
				palette,
				hovered,
				pointer: local,
				labelFont: LABEL_FONT,
			});
		};

		const localPointer = (): Point | null => {
			const state = pointer.get();
			if (!state.active || !finePointer) return null;
			return toCanvasPoint(canvas, state);
		};

		let lastHovered: string | undefined;
		let needsRepaint = true;

		const frame = () => {
			if (!simulation) return;
			const local = localPointer();
			const moved = advance(simulation, local, POINTER_OPTIONS);
			const hovered = local
				? simulation.find(local.x, local.y, HOVER_RADIUS)?.id
				: undefined;
			if (!moved && !needsRepaint && hovered === lastHovered) return;
			lastHovered = hovered;
			needsRepaint = false;
			draw(local);
		};

		const startLoop = () => {
			if (stopLoop || reduced) return;
			stopLoop = scheduler.add(frame);
		};

		const pauseLoop = () => {
			stopLoop?.();
			stopLoop = null;
		};

		const syncLoopWithVisibility = () => {
			if (onScreen && !document.hidden) startLoop();
			else pauseLoop();
		};

		const fitCanvas = () => {
			size = measure(wrapper);
			sizeBackingStore(canvas, size);
			if (!simulation) {
				simulation = createSimulation(graph, size.width, size.height);
				settle(
					simulation,
					reduced ? STATIC_SETTLE_TICKS : INITIAL_SETTLE_TICKS,
				);
			} else {
				refit(simulation, size.width, size.height);
				if (reduced) settle(simulation, REFIT_SETTLE_TICKS);
				else simulation.alpha(REFIT_ALPHA);
			}
			needsRepaint = true;
			draw(localPointer());
		};

		const repaintWithTheme = () => {
			palette = readPalette(canvas);
			needsRepaint = true;
			draw(localPointer());
		};

		const clearHover = () => draw(null);
		const highlightHover = (event: PointerEvent) =>
			draw(toCanvasPoint(canvas, { x: event.clientX, y: event.clientY }));

		const resizeObserver = new ResizeObserver(fitCanvas);
		resizeObserver.observe(wrapper);
		fitCanvas();

		const themeObserver = new MutationObserver(repaintWithTheme);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		const visibilityObserver = new IntersectionObserver((entries) => {
			onScreen = entries[0]?.isIntersecting ?? true;
			syncLoopWithVisibility();
		});
		visibilityObserver.observe(wrapper);
		document.addEventListener("visibilitychange", syncLoopWithVisibility);

		if (finePointer) {
			pointer.start();
			if (reduced)
				canvas.addEventListener("pointermove", highlightHover, PASSIVE);
			canvas.addEventListener("pointerleave", clearHover, PASSIVE);
		}
		startLoop();

		return () => {
			pauseLoop();
			pointer.stop();
			canvas.removeEventListener("pointermove", highlightHover);
			canvas.removeEventListener("pointerleave", clearHover);
			document.removeEventListener("visibilitychange", syncLoopWithVisibility);
			resizeObserver.disconnect();
			themeObserver.disconnect();
			visibilityObserver.disconnect();
		};
	}, [canvasRef, wrapperRef, reduced, finePointer]);
};
