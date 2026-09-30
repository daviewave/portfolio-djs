type FrameCallback = (time: number) => void;

const subscribers = new Set<FrameCallback>();
let frameId: number | null = null;

const runFrame = (time: number) => {
	frameId = null;
	for (const callback of subscribers) callback(time);
	requestNextFrameIfNeeded();
};

const requestNextFrameIfNeeded = () => {
	if (subscribers.size === 0 || frameId !== null) return;
	frameId = requestAnimationFrame(runFrame);
};

const cancelPendingFrame = () => {
	if (frameId === null) return;
	cancelAnimationFrame(frameId);
	frameId = null;
};

const add = (callback: FrameCallback) => {
	subscribers.add(callback);
	requestNextFrameIfNeeded();
	return () => {
		subscribers.delete(callback);
		if (subscribers.size === 0) cancelPendingFrame();
	};
};

export const scheduler = {
	add,
	get active() {
		return subscribers.size > 0;
	},
};
