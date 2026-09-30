import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
	timeZone: "America/Chicago",
});
const REFRESH_MS = 30_000;

export const useClock = () => {
	const [time, setTime] = useState(() => formatter.format(new Date()));
	useEffect(() => {
		const timer = setInterval(
			() => setTime(formatter.format(new Date())),
			REFRESH_MS,
		);
		return () => clearInterval(timer);
	}, []);
	return time;
};
