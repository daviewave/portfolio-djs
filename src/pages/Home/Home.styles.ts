import { cn } from "@/lib/utils";

export const homeStyles = {
	main: "mx-auto flex w-full max-w-[64rem] flex-col gap-[5rem] px-[1.25rem] pb-[5rem] pt-[2.5rem] md:gap-[7rem] md:px-[2rem] md:pt-[4rem]",
	prose:
		"max-w-[42rem] text-[1rem] leading-[1.7] text-muted md:text-[1.0625rem]",
	sectionTitle:
		"text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink md:text-[2.5rem]",
	sectionIndex: "pb-[0.5rem] font-mono text-[0.75rem] text-muted",
	ticks: "ticks mt-[0.75rem] opacity-60 md:opacity-100",
	sectionBody: "mt-[2rem]",
	hint: "mb-[1rem] text-[0.9375rem] text-muted",
	stackGrid: "grid gap-[2rem] lg:grid-cols-[minmax(0,1fr)_17rem] [&>*]:min-w-0",
	legend:
		"mt-[1rem] flex flex-wrap gap-x-[1.5rem] gap-y-[0.5rem] text-[0.875rem] text-muted",
	legendButton: (active: boolean) =>
		cn(
			"flex min-h-[2.25rem] items-center gap-[0.5rem] rounded-full px-[0.5rem] transition-colors hover:text-ink",
			active && "text-ink",
		),
	legendDot: "inline-block h-[0.5rem] w-[0.5rem] rounded-full",
} as const;

export const barStyles = {
	bar: "bar-surface sticky top-0 z-10 border-b border-line backdrop-blur",
	inner:
		"mx-auto flex h-[3.5rem] w-full max-w-[64rem] items-center justify-between gap-[1rem] px-[1.25rem] md:px-[2rem]",
	wordmark:
		"casual flex min-h-[2.75rem] items-center text-[1.125rem] font-medium text-ink",
	right: "flex items-center gap-[1.5rem]",
} as const;

export const navStyles = {
	bar: "hidden items-center gap-[1.5rem] md:flex",
	chips:
		"no-scrollbar -mx-[1.25rem] flex gap-[0.5rem] overflow-x-auto px-[1.25rem] md:hidden max-w-full min-w-0",
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
	wrap: "flex flex-col gap-[1.5rem] md:flex-row md:items-start md:gap-[2.5rem]",
	photo:
		"h-[5.5rem] w-[5.5rem] shrink-0 rounded-full object-cover md:h-[7rem] md:w-[7rem]",
	heading:
		"text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-ink md:text-[3.5rem]",
	intro:
		"mt-[1.25rem] max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted md:text-[1.125rem]",
	status: "mt-[1.25rem] font-mono text-[0.8125rem] text-muted",
	actions: "mt-[1.5rem] flex flex-wrap items-center gap-[0.75rem]",
	primary:
		"inline-flex min-h-[2.75rem] items-center rounded-full bg-ink px-[1.25rem] text-[0.9375rem] font-medium text-canvas transition-opacity hover:opacity-85",
	quiet:
		"inline-flex min-h-[2.75rem] items-center rounded-full border border-line px-[1.25rem] text-[0.9375rem] text-ink transition-colors hover:border-muted",
} as const;

export const footerStyles = {
	footer: "border-t border-line",
	inner:
		"mx-auto w-full max-w-[64rem] px-[1.25rem] py-[2rem] md:px-[2rem] grid gap-[1.5rem] md:grid-cols-[1fr_auto] md:items-baseline",
	links:
		"flex flex-wrap gap-x-[1.5rem] gap-y-[0.25rem] text-[0.9375rem] text-muted",
	link: "flex min-h-[2.75rem] items-center underline-offset-[0.25rem] hover:text-ink hover:underline",
	colophon:
		"mt-[1.5rem] max-w-[46rem] text-[0.8125rem] leading-[1.6] text-muted md:col-span-2",
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
