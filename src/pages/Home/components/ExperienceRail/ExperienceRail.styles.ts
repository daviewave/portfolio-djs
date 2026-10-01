export const railStyles = {
	list: "dim-siblings relative flex flex-col gap-[2.25rem] border-l border-line pl-[1.5rem] md:gap-[3rem] md:pl-[1.75rem]",
	progress: "absolute left-0 top-0 h-full w-px origin-top bg-ink",
	entry: "group relative transition-opacity",
	dot: "absolute -left-[1.8rem] top-[0.45rem] h-[0.6rem] w-[0.6rem] rounded-full transition-transform duration-300 group-hover:scale-150 md:-left-[2.05rem]",
	year: "font-mono text-[0.8125rem] text-muted",
	title:
		"mt-[0.25rem] text-pretty text-[1.125rem] font-medium leading-[1.35] text-ink",
	org: "font-normal text-muted",
	summary: "mt-[0.5rem] max-w-[62ch] text-[1rem] leading-[1.65] text-muted",
	highlights: "mt-[0.875rem] flex max-w-[62ch] flex-col gap-[0.5rem]",
	highlight:
		"relative pl-[1rem] text-[0.9375rem] leading-[1.6] text-muted before:absolute before:left-0 before:top-[0.75rem] before:h-px before:w-[0.5rem] before:bg-accent before:content-['']",
	tags: "mt-[0.5rem] flex flex-wrap gap-x-[1rem] md:mt-[0.875rem] md:gap-x-[0.75rem] md:gap-y-[0.25rem]",
	tag: "flex min-h-[2rem] items-center font-mono text-[0.8125rem] underline-offset-[0.25rem] hover:text-ink hover:underline md:min-h-0 md:text-[0.75rem]",
} as const;
