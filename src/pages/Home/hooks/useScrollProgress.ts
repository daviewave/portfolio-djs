import { useEffect, useState } from "react";

const readProgress = () => {
	const range = document.documentElement.scrollHeight - window.innerHeight;
	if (range <= 0) return 0;
	return Math.round(Math.min(1, Math.max(0, window.scrollY / range)) * 100);
};

export const useScrollProgress = () => {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		let frame = 0;
		const schedule = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				setProgress(readProgress());
			});
		};
		schedule();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
		};
	}, []);
	return progress;
};
