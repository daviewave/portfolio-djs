import { type RefObject, useEffect, useState } from "react";

export const useVisibility = (ref: RefObject<HTMLElement | null>) => {
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const observer = new IntersectionObserver((entries) => {
			setVisible(entries[0]?.isIntersecting ?? true);
		});
		observer.observe(element);
		const onVisibilityChange = () => setVisible(!document.hidden);
		document.addEventListener("visibilitychange", onVisibilityChange);
		return () => {
			observer.disconnect();
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [ref]);
	return visible;
};
