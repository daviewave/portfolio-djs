import { cn } from "@/lib/utils";
import type { GraphMode } from "./StackGraph.types";

interface GraphModeToggleProps {
	mode: GraphMode;
	onChange: (mode: GraphMode) => void;
}

const MODES: GraphMode[] = ["2d", "3d"];

const buttonClass = (active: boolean) =>
	cn(
		"rounded-[0.25rem] px-[0.5rem] py-[0.125rem] font-mono text-[0.75rem] transition-colors",
		active ? "bg-ink text-canvas" : "text-muted hover:text-ink",
	);

export function GraphModeToggle({ mode, onChange }: GraphModeToggleProps) {
	return (
		<fieldset className="flex items-center gap-[0.25rem] rounded-[0.375rem] border border-line p-[0.125rem]">
			<legend className="sr-only">Graph renderer</legend>
			{MODES.map((option) => (
				<button
					key={option}
					type="button"
					aria-pressed={mode === option}
					className={buttonClass(mode === option)}
					onClick={() => onChange(option)}
				>
					{option.toUpperCase()}
				</button>
			))}
		</fieldset>
	);
}
