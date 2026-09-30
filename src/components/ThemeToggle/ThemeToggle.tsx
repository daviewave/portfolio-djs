import type { MouseEvent } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const SunIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.75"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
	</svg>
);

const MoonIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.75"
		aria-hidden="true"
	>
		<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
	</svg>
);

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggle } = useTheme();
	const nextLabel =
		theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
	const onClick = (event: MouseEvent<HTMLButtonElement>) =>
		toggle({ x: event.clientX, y: event.clientY });

	return (
		<button
			type="button"
			aria-label={nextLabel}
			onClick={onClick}
			className={cn(
				"inline-flex size-[2.25rem] items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-muted [&>svg]:size-[1.125rem]",
				className,
			)}
		>
			{theme === "dark" ? <SunIcon /> : <MoonIcon />}
		</button>
	);
}
