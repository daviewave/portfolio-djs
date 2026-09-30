import { useInView } from "motion/react";
import { useRef } from "react";
import type { Metric } from "@/content";
import { profile } from "@/content";
import { useCountUp } from "../../hooks/useCountUp";

const decimalsOf = (value: number) =>
	(String(value).split(".")[1] ?? "").length;

const MetricTile = ({
	metric,
	active,
}: {
	metric: Metric;
	active: boolean;
}) => {
	const value = useCountUp(metric.value, active).toFixed(
		decimalsOf(metric.value),
	);
	return (
		<div>
			<p className="text-[2.5rem] font-medium leading-none tracking-[-0.02em] tabular-nums text-ink lg:text-[3rem]">
				{value}
				{metric.suffix}
			</p>
			<p className="mt-[0.5rem] max-w-[16rem] text-[0.9375rem] leading-[1.5] text-muted">
				{metric.label}
			</p>
		</div>
	);
};

export function Metrics() {
	const gridRef = useRef<HTMLDivElement>(null);
	const inView = useInView(gridRef, { once: true, amount: 0.4 });
	return (
		<div ref={gridRef} className="grid grid-cols-2 gap-x-[2rem] gap-y-[2.5rem]">
			{profile.metrics.map((metric) => (
				<MetricTile key={metric.label} metric={metric} active={inView} />
			))}
		</div>
	);
}
