import { useClock } from "../../hooks/useClock";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import type { ReadoutsProps } from "./Readouts.types";

export const padIndex = (value: number) => String(value).padStart(2, "0");

export function Readouts({ activeIndex, total }: ReadoutsProps) {
	const time = useClock();
	const progress = useScrollProgress();
	return (
		<dl className="flex flex-wrap gap-x-[1.5rem] gap-y-[0.25rem] font-mono text-[0.75rem] text-muted">
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
