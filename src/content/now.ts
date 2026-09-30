export interface RecentWin {
	headline: string;
	detail: string;
}

export interface NowContent {
	paragraphs: string[];
	recent: RecentWin[];
}

export const now: NowContent = {
	paragraphs: [
		"Most of my week goes into Wolverine: graph queries on Neptune, LLM pipelines on Bedrock, a Django and React codebase, and the CI/CD that keeps releases boring. About twenty people and a few AI coding agents share that codebase, so a lot of my job is keeping it easy to work in.",
		"The habit I care about most is making work legible: one Makefile as the front door, tests gating every stage, and documentation that writes itself from the code so nobody has to ask twice.",
	],
	recent: [
		{
			headline: "3.6x faster graph analytics",
			detail:
				"A core Neptune workload went from 6.34 s to 1.78 s once its sequential round-trips became a few set-based queries. The same pass fixed a scoring bug that counted partial coverage as complete.",
		},
		{
			headline: "Documentation that writes itself",
			detail:
				"Weekly Bedrock-powered GitHub Actions move verbose code comments into docs, log findings to per-area backlogs, and sync both to Confluence in plain language: an estimated 10+ engineering hours a week we no longer spend writing for non-technical readers.",
		},
		{
			headline: "Releases nobody has to babysit",
			detail:
				"Trunk-based CI/CD with tests gating each stage, balanced Playwright shards, and automated AWS Marketplace releases with gated promotion, automatic rollback and image digest checks.",
		},
	],
};
