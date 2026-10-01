import { useEffect } from "react";
import {
	createPointerStore,
	scheduler,
	useMotionPreference,
} from "@/lib/motion";
import { createTouchLight } from "./touchLight";

const PASSIVE = { passive: true } as const;

const paintAt = (x: number, y: number) => {
	const root = document.documentElement.style;
	root.setProperty("--mx", `${x}px`);
	root.setProperty("--my", `${y}px`);
};

const clearLight = () => {
	const root = document.documentElement.style;
	root.removeProperty("--mx");
	root.removeProperty("--my");
};

const followPointer = () => {
	const pointer = createPointerStore(window);
	let lastX = Number.NaN;
	let lastY = Number.NaN;
	pointer.start();
	const stop = scheduler.add(() => {
		const { x, y, active } = pointer.get();
		if (!active || (x === lastX && y === lastY)) return;
		lastX = x;
		lastY = y;
		paintAt(x, y);
	});
	return () => {
		stop();
		pointer.stop();
		clearLight();
	};
};

// Without a cursor the light rides the scroll and jumps to wherever is touched.
const followTouch = () => {
	const light = createTouchLight();
	window.addEventListener("pointerdown", light.onTouch, PASSIVE);
	window.addEventListener("pointermove", light.onTouch, PASSIVE);
	const stop = scheduler.add(() => {
		const point = light.step();
		if (point) paintAt(point.x, point.y);
	});
	return () => {
		stop();
		window.removeEventListener("pointerdown", light.onTouch);
		window.removeEventListener("pointermove", light.onTouch);
		clearLight();
	};
};

export function CursorLight() {
	const { reduced, finePointer } = useMotionPreference();
	const lit = !reduced;

	useEffect(() => {
		if (!lit) return undefined;
		return finePointer ? followPointer() : followTouch();
	}, [lit, finePointer]);

	return (
		<>
			<div aria-hidden="true" className="grid-field grid-field--base" />
			{lit && <div aria-hidden="true" className="grid-field grid-field--lit" />}
			{lit && <div aria-hidden="true" className="cursor-light" />}
		</>
	);
}
