import { useClock } from "../../hooks/useClock";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import type { ReadoutsProps } from "./Readouts.types";

export const padIndex = (value: number) => String(value).padStart(2, "0");

export function Readouts({ activeIndex, total }: ReadoutsProps) {
	const time = useClock();
	const progress = useScrollProgress();
	return (
		<dl className="mt-[2rem] grid grid-cols-3 gap-[1rem] font-mono text-[0.75rem] text-muted">
			<div>
				<dt className="sr-only">Local time</dt>
				<dd>Austin {time}</dd>
			</div>
			<div>
				<dt className="sr-only">Scroll position</dt>
				<dd>scroll {padIndex(progress)}%</dd>
			</div>
			<div>
				<dt className="sr-only">Current section</dt>
				<dd>
					section {padIndex(activeIndex + 1)} / {padIndex(total)}
				</dd>
			</div>
		</dl>
	);
}
