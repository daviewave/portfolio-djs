import { areas, detailFor } from "@/content";
import { cn } from "@/lib/utils";
import { areaDotStyles } from "../../Home.styles";
import type { TechDetailProps } from "./TechDetail.types";

const areaLabel = (id: string) =>
	areas.find((area) => area.id === id)?.label ?? id;

export function TechDetail({ technology }: TechDetailProps) {
	if (!technology) {
		return (
			<div className="flex h-full flex-col justify-center border-t border-line pt-[1.25rem] lg:border-t-0 lg:border-l lg:pl-[1.5rem] lg:pt-0">
				<p className="text-[0.9375rem] leading-[1.6] text-muted">
					Click a node to see how I have used it. Hubs group the stack by area.
				</p>
			</div>
		);
	}
	const detail = detailFor(technology.id);
	return (
		<div
			aria-live="polite"
			className="border-t border-line pt-[1.25rem] lg:border-t-0 lg:border-l lg:pl-[1.5rem] lg:pt-0"
		>
			<p className="flex items-center gap-[0.5rem] font-mono text-[0.75rem] text-muted">
				<span
					aria-hidden="true"
					className={cn(
						"inline-block h-[0.5rem] w-[0.5rem] rounded-full",
						areaDotStyles[technology.area],
					)}
				/>
				{areaLabel(technology.area)}
			</p>
			<h3 className="mt-[0.5rem] text-[1.375rem] font-medium leading-[1.2] text-ink">
				{technology.label}
			</h3>
			<p className="mt-[0.75rem] text-[0.9375rem] leading-[1.6] text-muted">
				{detail?.summary}
			</p>
			{detail && detail.usedIn.length > 0 && (
				<p className="mt-[1rem] font-mono text-[0.75rem] leading-[1.7] text-muted">
					<span className="text-ink">Used in</span> {detail.usedIn.join(", ")}
				</p>
			)}
		</div>
	);
}
