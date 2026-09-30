export interface PointerState {
	x: number;
	y: number;
	active: boolean;
}

const PASSIVE = { passive: true } as const;

export const createPointerStore = (target: Window | HTMLElement) => {
	const state: PointerState = { x: 0, y: 0, active: false };

	const onMove = (event: Event) => {
		const { clientX, clientY } = event as PointerEvent;
		state.x = clientX;
		state.y = clientY;
		state.active = true;
	};

	const onLeave = () => {
		state.active = false;
	};

	return {
		get: () => state,
		start: () => {
			target.addEventListener("pointermove", onMove, PASSIVE);
			target.addEventListener("pointerleave", onLeave, PASSIVE);
		},
		stop: () => {
			target.removeEventListener("pointermove", onMove);
			target.removeEventListener("pointerleave", onLeave);
		},
	};
};
