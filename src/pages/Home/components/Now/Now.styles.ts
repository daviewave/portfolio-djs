export const nowStyles = {
	wrap: "grid gap-[2.5rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[4rem]",
	paragraphs: "flex flex-col gap-[1.25rem]",
	recentLabel: "font-mono text-[0.75rem] text-muted",
	recentList:
		"mt-[0.75rem] flex flex-col divide-y divide-line border-t border-line",
	recentItem:
		"relative py-[1rem] pl-[1rem] before:absolute before:left-0 before:top-[1.35rem] before:h-[0.375rem] before:w-[0.375rem] before:rounded-full before:bg-accent before:content-['']",
	recentHeadline: "text-[1.0625rem] font-medium leading-[1.3] text-ink",
	recentDetail: "mt-[0.375rem] text-[0.9375rem] leading-[1.6] text-muted",
} as const;
