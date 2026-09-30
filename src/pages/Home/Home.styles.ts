import { cn } from "@/lib/utils";

export const homeStyles = {
	shell:
		"mx-auto grid max-w-[80rem] gap-x-[6rem] px-[1.5rem] lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:px-[3rem]",
	panel:
		"py-[3rem] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-y-auto lg:py-[3rem]",
	ledger: "flex flex-col gap-[7rem] py-[3rem] lg:py-[6rem]",
	name: "text-[3rem] font-medium leading-[1.02] tracking-[-0.02em] lg:text-[3.5rem]",
	role: "mt-[0.75rem] text-[1.125rem] text-ink",
	location: "mt-[0.25rem] font-mono text-[0.8125rem] text-muted",
	intro:
		"mt-[1.5rem] max-w-[34rem] text-[1rem] leading-[1.6] text-muted lg:text-[0.9375rem] lg:leading-[1.55]",
	sectionTitle:
		"text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink lg:text-[2.5rem]",
	sectionBody: "mt-[2rem]",
	prose: "max-w-[62ch] text-[1.0625rem] leading-[1.65] text-muted",
	navList: "mt-[2rem] hidden flex-col gap-[0.625rem] lg:flex",
	navLink: (active: boolean) =>
		cn(
			"group flex items-center gap-[0.75rem] text-[0.9375rem] text-muted transition-colors hover:text-ink",
			active && "text-ink",
		),
	navRule: (active: boolean) =>
		cn(
			"h-px w-[2rem] bg-line transition-[width,background-color] duration-300 group-hover:w-[4rem] group-hover:bg-ink",
			active && "w-[4rem] bg-ink",
		),
	panelFooter:
		"mt-[2rem] flex items-center gap-[1.5rem] text-[0.9375rem] text-muted",
	panelLink: "underline-offset-[0.25rem] hover:text-ink hover:underline",
	legend:
		"mt-[1rem] flex flex-wrap gap-x-[1.5rem] gap-y-[0.5rem] text-[0.875rem] text-muted",
	legendDot: "inline-block h-[0.5rem] w-[0.5rem] rounded-full",
	skipLink:
		"sr-only focus:not-sr-only focus:fixed focus:left-[1rem] focus:top-[1rem] focus:z-50 focus:rounded-[0.25rem] focus:bg-raised focus:px-[1rem] focus:py-[0.5rem] focus:text-ink",
} as const;

export const areaDotStyles = {
	backend: "bg-area-backend",
	frontend: "bg-area-frontend",
	ai: "bg-area-ai",
	infra: "bg-area-infra",
} as const;

export const areaTextStyles = {
	backend: "text-area-backend",
	frontend: "text-area-frontend",
	ai: "text-area-ai",
	infra: "text-area-infra",
} as const;
