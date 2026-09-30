import { useEffect, useState } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";

const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(
		() => window.matchMedia(query).matches,
	);

	useEffect(() => {
		const media = window.matchMedia(query);
		setMatches(media.matches);
		const onChange = (event: { matches: boolean }) => setMatches(event.matches);
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, [query]);

	return matches;
};

export const useMotionPreference = () => ({
	reduced: useMediaQuery(REDUCED_MOTION),
	finePointer: useMediaQuery(FINE_POINTER),
});
