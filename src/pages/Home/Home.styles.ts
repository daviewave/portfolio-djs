import { cn } from "@/lib/utils";

export const homeStyles = {
	main: "mx-auto flex w-full max-w-[64rem] flex-col gap-[4.5rem] px-[1.25rem] pb-[4.5rem] pt-[2rem] md:pb-[5rem] md:gap-[7rem] md:px-[2rem] md:pt-[4rem]",
	prose:
		"max-w-[42rem] text-[1rem] leading-[1.7] text-muted md:text-[1.0625rem]",
	sectionTitle:
		"min-w-0 text-balance text-[1.75rem] leading-[1.1] tracking-[-0.01em] text-ink md:text-[2.5rem]",
	sectionIndex:
		"shrink-0 whitespace-nowrap pb-[0.25rem] font-mono text-[0.75rem] text-muted md:pb-[0.5rem]",
	ticks: "ticks mt-[0.75rem] opacity-60 md:opacity-100",
	sectionBody: "mt-[1.5rem] md:mt-[2rem]",
} as const;

export const barStyles = {
	bar: "bar-surface sticky top-0 z-10 border-b border-line backdrop-blur",
	inner:
		"mx-auto flex h-[3.5rem] w-full max-w-[64rem] items-center justify-between gap-[1rem] px-[1.25rem] md:px-[2rem]",
	wordmark:
		"casual flex min-h-[2.75rem] shrink-0 items-center text-[1.125rem] font-medium text-ink",
	right: "flex items-center md:gap-[1.5rem]",
	profiles:
		"flex items-center gap-[0.875rem] md:gap-[1.25rem] md:border-l md:border-line md:pl-[1.5rem]",
	profile:
		"flex min-h-[2.75rem] items-center text-[0.875rem] text-ink underline-offset-[0.25rem] hover:underline md:text-[0.9375rem]",
} as const;

export const navStyles = {
	bar: "hidden items-center gap-[1.5rem] md:flex",
	chips:
		"no-scrollbar fade-right -mx-[1.25rem] flex gap-[0.5rem] overflow-x-auto px-[1.25rem] md:hidden",
	barLink: (active: boolean) =>
		cn(
			"flex min-h-[2.75rem] items-center text-[0.9375rem] text-muted transition-colors hover:text-ink",
			active && "text-ink",
		),
	chip: (active: boolean) =>
		cn(
			"flex min-h-[2.75rem] shrink-0 items-center rounded-full border border-line px-[1rem] font-mono text-[0.8125rem] text-muted transition-colors hover:text-ink",
			active && "border-accent text-ink",
		),
} as const;

export const heroStyles = {
	wrap: "flex flex-col gap-[1.25rem] md:flex-row md:items-start md:gap-[2.5rem]",
	photo:
		"h-[6rem] w-[6rem] shrink-0 rounded-full border border-line bg-raised object-cover md:h-[8rem] md:w-[8rem]",
	heading:
		"text-balance text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.5rem]",
	intro:
		"mt-[1rem] max-w-[42rem] text-[1rem] leading-[1.65] text-muted md:mt-[1.25rem] md:text-[1.125rem] md:leading-[1.7]",
	actions: "mt-[1.5rem] flex flex-wrap items-center gap-[0.75rem]",
	primary:
		"inline-flex min-h-[2.75rem] items-center rounded-full bg-ink px-[1.25rem] text-[0.9375rem] font-medium text-canvas transition-opacity hover:opacity-85",
	quiet:
		"inline-flex min-h-[2.75rem] items-center rounded-full border border-line px-[1.25rem] text-[0.9375rem] text-ink transition-colors hover:border-muted",
} as const;

export const footerStyles = {
	footer: "border-t border-line",
	inner:
		"mx-auto grid w-full max-w-[64rem] gap-[1rem] px-[1.25rem] py-[1.5rem] md:grid-cols-[1fr_auto] md:items-baseline md:gap-[1.5rem] md:px-[2rem] md:py-[2rem]",
	links:
		"flex flex-wrap gap-x-[1.5rem] text-[0.9375rem] text-muted max-sm:[&>li:first-child]:w-full",
	link: "flex min-h-[2.75rem] items-center underline-offset-[0.25rem] hover:text-ink hover:underline",
	colophon:
		"max-w-[46rem] text-[0.8125rem] leading-[1.6] text-muted md:col-span-2 md:mt-[1.5rem]",
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
