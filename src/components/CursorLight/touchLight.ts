export interface Point {
	x: number;
	y: number;
}

const TOUCH_HOLD_MS = 1400;
const EASE = 0.12;
const SETTLED = 0.5;

// Where the light rests when nothing is touching the screen: it weaves from
// side to side as the page scrolls, so scrolling itself moves the light.
export const driftPoint = (
	scrollY: number,
	width: number,
	height: number,
): Point => ({
	x: width * (0.5 + 0.36 * Math.sin(scrollY / 420)),
	y: height * (0.38 + 0.14 * Math.cos(scrollY / 610)),
});

// A light that follows the finger while it is down, then eases back to its
// scroll path. `step` returns null once it has nothing new to paint.
export const createTouchLight = (
	now: () => number = () => performance.now(),
) => {
	let touch: Point | null = null;
	let touchedAt = Number.NEGATIVE_INFINITY;
	let current: Point | null = null;

	const onTouch = (event: Event) => {
		const { clientX, clientY } = event as PointerEvent;
		touch = { x: clientX, y: clientY };
		touchedAt = now();
	};

	const step = (): Point | null => {
		const held = touch !== null && now() - touchedAt < TOUCH_HOLD_MS;
		const target =
			held && touch
				? touch
				: driftPoint(window.scrollY, window.innerWidth, window.innerHeight);
		if (current === null) {
			current = { ...target };
			return current;
		}
		const dx = target.x - current.x;
		const dy = target.y - current.y;
		if (Math.abs(dx) < SETTLED && Math.abs(dy) < SETTLED) return null;
		current = { x: current.x + dx * EASE, y: current.y + dy * EASE };
		return current;
	};

	return { onTouch, step };
};
