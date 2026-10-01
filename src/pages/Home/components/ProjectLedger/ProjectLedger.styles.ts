import { cn } from "@/lib/utils";

export const ledgerStyles = {
	groups: "flex flex-col gap-[3rem] md:gap-[4rem]",
	groupTitle: "text-[1.25rem] font-medium leading-[1.3] text-ink",
	groupNote:
		"mt-[0.25rem] max-w-[42rem] text-[0.9375rem] leading-[1.6] text-muted",
	list: "mt-[1.25rem] grid gap-[1rem] md:grid-cols-2 md:gap-[1.25rem]",
	card: (featured: boolean, linked: boolean) =>
		cn(
			"relative flex flex-col rounded-[0.75rem] border border-line bg-raised p-[1.25rem] md:p-[1.5rem]",
			linked && "transition-colors hover:border-muted",
			featured &&
				"md:col-span-2 md:grid md:grid-cols-2 md:gap-x-[2.5rem] md:p-[2rem]",
		),
	head: "flex items-center justify-between gap-[1rem] font-mono text-[0.75rem] text-muted",
	kind: "flex min-w-0 items-center gap-[0.5rem]",
	dot: "inline-block h-[0.5rem] w-[0.5rem] shrink-0 rounded-full",
	year: "shrink-0 whitespace-nowrap",
	title: (featured: boolean) =>
		cn(
			"mt-[0.75rem] font-medium leading-[1.25] text-ink",
			featured ? "text-[1.5rem] md:text-[1.75rem]" : "text-[1.25rem]",
		),
	// The title link stretches over the whole card; the footer links sit above it.
	titleLink: "after:absolute after:inset-0 after:rounded-[0.75rem]",
	org: "mt-[0.25rem] text-[0.9375rem] text-muted",
	description: "mt-[0.5rem] text-[1rem] leading-[1.65] text-muted",
	highlights: (featured: boolean) =>
		cn(
			"mt-[1rem] flex flex-col gap-[0.5rem]",
			featured && "md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0",
		),
	highlight:
		"relative pl-[1rem] text-[0.9375rem] leading-[1.6] text-muted before:absolute before:left-0 before:top-[0.75rem] before:h-px before:w-[0.5rem] before:bg-accent before:content-['']",
	foot: "mt-auto flex flex-wrap items-center justify-between gap-x-[1rem] pt-[1rem]",
	tags: "flex flex-wrap gap-x-[0.75rem] gap-y-[0.125rem] font-mono text-[0.75rem]",
	closed:
		"flex min-h-[2.75rem] items-center font-mono text-[0.75rem] text-muted",
	links: "relative z-[1] flex gap-x-[1.25rem]",
	link: "flex min-h-[2.75rem] items-center text-[0.9375rem] text-ink underline-offset-[0.25rem] hover:underline",
} as const;
