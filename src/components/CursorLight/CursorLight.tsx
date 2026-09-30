import { useEffect } from "react";
import {
	createPointerStore,
	scheduler,
	useMotionPreference,
} from "@/lib/motion";

const followPointer = () => {
	const pointer = createPointerStore(window);
	const root = document.documentElement.style;
	let lastX = Number.NaN;
	let lastY = Number.NaN;
	pointer.start();
	const stop = scheduler.add(() => {
		const { x, y, active } = pointer.get();
		if (!active || (x === lastX && y === lastY)) return;
		lastX = x;
		lastY = y;
		root.setProperty("--mx", `${x}px`);
		root.setProperty("--my", `${y}px`);
	});
	return () => {
		stop();
		pointer.stop();
		root.removeProperty("--mx");
		root.removeProperty("--my");
	};
};

export function CursorLight() {
	const { reduced, finePointer } = useMotionPreference();
	const lit = finePointer && !reduced;

	useEffect(() => (lit ? followPointer() : undefined), [lit]);

	return (
		<>
			<div aria-hidden="true" className="grid-field grid-field--base" />
			{lit && <div aria-hidden="true" className="grid-field grid-field--lit" />}
			{lit && <div aria-hidden="true" className="cursor-light" />}
		</>
	);
}
