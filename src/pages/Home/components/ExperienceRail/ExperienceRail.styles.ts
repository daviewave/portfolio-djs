export const railStyles = {
	list: "dim-siblings relative flex flex-col gap-[2.5rem] border-l border-line pl-[1.75rem]",
	progress: "absolute -left-px top-0 h-full w-px origin-top bg-ink",
	entry: "relative transition-opacity",
	dot: "absolute -left-[2.05rem] top-[0.45rem] h-[0.6rem] w-[0.6rem] rounded-full",
	year: "font-mono text-[0.8125rem] text-muted",
	title: "mt-[0.25rem] text-[1.125rem] font-medium text-ink",
	org: "font-normal text-muted",
	summary: "mt-[0.5rem] max-w-[62ch] text-[1rem] leading-[1.6] text-muted",
} as const;
