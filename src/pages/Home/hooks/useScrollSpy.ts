import { useEffect, useState } from "react";

const ROOT_MARGIN = "-40% 0px -55% 0px";
const BOTTOM_TOLERANCE = 2;

const findTargets = (ids: string[]) =>
	ids
		.map((id) => document.getElementById(id))
		.filter((element): element is HTMLElement => element !== null);

const atPageBottom = () =>
	window.innerHeight + window.scrollY >=
	document.documentElement.scrollHeight - BOTTOM_TOLERANCE;

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
		const markLastWhenAtBottom = () => {
			if (atPageBottom()) setActiveId(ids[ids.length - 1] ?? null);
		};
		window.addEventListener("scroll", markLastWhenAtBottom, { passive: true });
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", markLastWhenAtBottom);
		};
	}, [ids]);

	return activeId;
};
