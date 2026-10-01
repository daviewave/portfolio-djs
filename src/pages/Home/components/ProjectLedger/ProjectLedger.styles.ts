export const ledgerStyles = {
	list: "dim-siblings divide-y divide-line border-t border-line",
	row: "grid gap-[0.25rem] pb-[0.75rem] pt-[1.5rem] md:gap-[0.75rem] md:py-[1.5rem] transition-opacity md:grid-cols-[minmax(0,1fr)_auto] md:gap-[2rem] relative before:absolute before:-left-[1rem] before:top-[1.5rem] before:h-[1.25rem] before:w-px before:bg-accent before:opacity-0 before:transition-opacity before:content-[''] hover:before:opacity-100",
	title: "text-[1.25rem] font-medium leading-[1.3] text-ink",
	titleLink: "transition-colors hover:text-muted",
	description: "mt-[0.5rem] max-w-[60ch] text-[1rem] leading-[1.65] text-muted",
	meta: "mt-[0.5rem] flex flex-wrap gap-x-[1rem] gap-y-[0.25rem] text-[0.8125rem] text-muted",
	codeLink:
		"flex min-h-[2.75rem] items-center text-[0.9375rem] text-ink underline-offset-[0.25rem] hover:underline md:self-start",
} as const;
