import { animate } from "motion/react";
import { useEffect, useState } from "react";
import { useMotionPreference } from "@/lib/motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const decimalsOf = (value: number) =>
	(String(value).split(".")[1] ?? "").length;
const roundTo = (value: number, decimals: number) =>
	Number(value.toFixed(decimals));

export const useCountUp = (
	target: number,
	active: boolean,
	durationMs = 1200,
) => {
	const { reduced } = useMotionPreference();
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!active || reduced) return;
		const decimals = decimalsOf(target);
		const controls = animate(0, target, {
			duration: durationMs / 1000,
			ease: EASE_OUT_EXPO,
			onUpdate: (latest) => setValue(roundTo(latest, decimals)),
		});
		return () => controls.stop();
	}, [active, reduced, target, durationMs]);

	return reduced ? target : value;
};
