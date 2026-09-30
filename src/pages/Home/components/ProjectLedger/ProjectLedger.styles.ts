export const ledgerStyles = {
	list: "dim-siblings divide-y divide-line border-t border-line",
	row: "grid gap-[0.75rem] py-[1.5rem] transition-opacity md:grid-cols-[13rem_minmax(0,1fr)_auto] md:gap-[2rem]",
	title: "text-[1.25rem] font-medium leading-[1.3] text-ink",
	titleLink: "transition-colors hover:text-muted",
	description: "max-w-[60ch] text-[1rem] leading-[1.6] text-muted",
	meta: "mt-[0.5rem] text-[0.8125rem] text-muted",
	codeLink:
		"text-[0.9375rem] text-ink underline-offset-[0.25rem] hover:underline md:justify-self-end",
} as const;
