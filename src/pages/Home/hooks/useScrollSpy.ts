import { useEffect, useState } from "react";

const ROOT_MARGIN = "-40% 0px -55% 0px";

const findTargets = (ids: string[]) =>
	ids
		.map((id) => document.getElementById(id))
		.filter((element): element is HTMLElement => element !== null);

// `ids` should be a stable reference (a module constant) so the observer is created once.
export const useScrollSpy = (ids: string[]) => {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const hit = entries.find((entry) => entry.isIntersecting);
				if (hit) setActiveId(hit.target.id);
			},
			{ rootMargin: ROOT_MARGIN },
		);
		for (const target of findTargets(ids)) observer.observe(target);
		return () => observer.disconnect();
	}, [ids]);

	return activeId;
};
