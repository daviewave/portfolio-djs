import { applyTheme, type Theme } from "./theme";

type Origin = { x: number; y: number };

const WIPE_DURATION_MS = 500;
const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

type ViewTransitionDocument = Document & {
	startViewTransition?: (callback: () => void) => {
		ready: Promise<void>;
		finished: Promise<void>;
	};
};

const prefersReducedMotion = (): boolean =>
	matchMedia("(prefers-reduced-motion: reduce)").matches;

const wipeOriginFor = (origin?: Origin): Origin => ({
	x: origin?.x ?? window.innerWidth / 2,
	y: origin?.y ?? window.innerHeight / 2,
});

const radiusToFarthestCorner = ({ x, y }: Origin): number =>
	Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y),
	);

const animateWipe = ({ x, y }: Origin): Promise<unknown> => {
	const radius = radiusToFarthestCorner({ x, y });
	const animation = document.documentElement.animate(
		{
			clipPath: [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${radius}px at ${x}px ${y}px)`,
			],
		},
		{
			duration: WIPE_DURATION_MS,
			easing: EASE_OUT_EXPO,
			pseudoElement: "::view-transition-new(root)",
		},
	);
	return animation.finished;
};

export const switchThemeWithWipe = async (
	next: Theme,
	origin?: Origin,
): Promise<void> => {
	const { startViewTransition } = document as ViewTransitionDocument;
	if (!startViewTransition || prefersReducedMotion()) {
		applyTheme(next);
		return;
	}
	const transition = startViewTransition.call(document, () => applyTheme(next));
	await transition.ready;
	await animateWipe(wipeOriginFor(origin));
};
