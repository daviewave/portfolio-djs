import type { TechnologyDetail } from "./types";

const W = "Wolverine at Cyberhill";
const U = "Ultra Intelligence & Communications";
const E = "Easy Covers";
const S = "Skaion";
const F = "Forum Systems";

export const technologyDetails: Record<string, TechnologyDetail> = {
	python: {
		summary:
			"My primary language for eight years: Django and FastAPI services, Celery workers, data pipelines, and the automation behind every project.",
		usedIn: [W, U, E, S, F, "PyScripts"],
	},
	django: {
		summary:
			"The backbone of Wolverine, Easy Covers, Skaion's offline app and Quantum Sim. I moved Wolverine's backend from FastAPI to Django for its ORM and kept async graph queries fast through Django Ninja.",
		usedIn: [W, U, E, S, F, "GreatKart"],
	},
	"django-rest-framework": {
		summary:
			"REST layers for Wolverine and Quantum Sim: thin viewsets over service functions so views, tasks and commands share one workflow.",
		usedIn: [W, F],
	},
	fastapi: {
		summary:
			"Wolverine's original backend and its graph proxy service, the one place that signs requests to the production graph.",
		usedIn: [W],
	},
	flask: {
		summary:
			"Lightweight services in Easy Covers, alongside Django and Next.js.",
		usedIn: [E],
	},
	celery: {
		summary:
			"Background work with retries: Wolverine's document processing, and Skaion's queued GPT4All requests under strict memory limits.",
		usedIn: [W, S],
	},
	websockets: {
		summary:
			"Real-time AI chat in Wolverine: LLM tokens streamed over Django Channels, with Redis keeping them in order.",
		usedIn: [W],
	},
	"rest-apis": {
		summary:
			"Designed the APIs behind Wolverine, Easy Covers and Quantum Sim; contract tests run after every graph update.",
		usedIn: [W, E, F],
	},
	microservices: {
		summary:
			"Split Ultra's Django and React monolith into independently deployed services, and built Easy Covers as containerized services from day one.",
		usedIn: [U, E],
	},
	pytest: {
		summary:
			"Unit and contract suites for Wolverine's backend and research console, gating every CI stage.",
		usedIn: [W],
	},
	react: {
		summary:
			"Frontends for Wolverine, Ultra's flagship product, Easy Covers, Skaion's offline app and Quantum Sim.",
		usedIn: [W, U, E, S, F],
	},
	typescript: {
		summary:
			"Standard for every frontend I've led; migrated Ultra's legacy UI to React and TypeScript with feature-scoped Redux stores.",
		usedIn: [W, U, E],
	},
	nextjs: {
		summary:
			"Easy Covers' recruiter app, Prompt Pioneer, and the previous version of this site.",
		usedIn: [E, "Prompt Pioneer"],
	},
	vite: {
		summary: "Wolverine's SPA build and this site's.",
		usedIn: [W, "This site"],
	},
	"tanstack-query": {
		summary:
			"Owns all server state in Wolverine's frontend: no fetching in effects, polling as refetchInterval, mutations carrying their own busy and error state.",
		usedIn: [W],
	},
	redux: {
		summary:
			"Feature-scoped stores during Ultra's UI migration so each feature owns its state.",
		usedIn: [U],
	},
	tailwind: {
		summary:
			"Token-only styling in Wolverine and on this site, where the default palette is disabled so only design tokens exist.",
		usedIn: [W, "This site"],
	},
	"material-ui": {
		summary: "Ultra's migrated UI and Easy Covers' recruiter frontend.",
		usedIn: [U, E],
	},
	"design-systems": {
		summary:
			"Partnered with design and leadership on Wolverine's layered design system: shared base components as an npm package, per-app compositions, and AI agents that compare each design to the live app.",
		usedIn: [W],
	},
	playwright: {
		summary:
			"Wolverine's no-mocks end-to-end suite: 111 tests split into critical and non-critical tiers and sharded in CI.",
		usedIn: [W],
	},
	bedrock: {
		summary:
			"Wolverine's LLM layer: chat, GraphRAG, a research console running four model families, and weekly documentation automation.",
		usedIn: [W],
	},
	langchain: {
		summary: "Orchestration for Wolverine's chat and research pipelines.",
		usedIn: [W],
	},
	graphrag: {
		summary:
			"Turns plain-English questions into openCypher and SPARQL over Wolverine's knowledge graph to show how security tools and frameworks relate.",
		usedIn: [W],
	},
	"agentic-ai": {
		summary:
			"Wolverine shipped as an agentic AI product on AWS Marketplace; its research console holds every agent result for CISO approval.",
		usedIn: [W],
	},
	"llm-guardrails": {
		summary:
			"A human-in-the-loop state machine and contract tests around Wolverine's LLM outputs.",
		usedIn: [W],
	},
	nlp: {
		summary:
			"A contract-analysis pipeline at Forum Systems with Word2Vec, Transformers and GPT, and sentiment classification of voter responses at Kwak Lab.",
		usedIn: [F, "Kwak Laboratory"],
	},
	whisper: {
		summary:
			"Transcribed recruiter phone calls in Easy Covers, feeding LLM-generated notes and match scores.",
		usedIn: [E],
	},
	postgresql: {
		summary:
			"The relational store in every Django project; Wolverine's dual-database design keeps it separate from the graph layer.",
		usedIn: [W, U, E, S, "GreatKart"],
	},
	neo4j: {
		summary:
			"Wolverine's development graph and the LPG side of its LPG-to-RDF migration.",
		usedIn: [W],
	},
	neptune: {
		summary:
			"Wolverine's production graph. Made a core analytics workload 3.6x faster by batching sequential round-trips into set-based queries.",
		usedIn: [W],
	},
	redis: {
		summary:
			"Message ordering for Wolverine's streaming chat, and the Celery broker at Skaion.",
		usedIn: [W, S],
	},
	opencypher: {
		summary: "Wolverine's graph query language before the RDF move.",
		usedIn: [W],
	},
	sparql: {
		summary: "Wolverine's graph queries after the LPG-to-RDF migration.",
		usedIn: [W],
	},
	aws: {
		summary:
			"Wolverine runs on ECS/Fargate with Bedrock, Neptune, S3 and IAM, released to AWS Marketplace with gated promotion and automatic rollback.",
		usedIn: [W, E, "GreatKart"],
	},
	terraform: {
		summary: "Codified Wolverine's lab environments.",
		usedIn: [W],
	},
	cloudformation: {
		summary:
			"Hardened the 48-resource template customers launch Wolverine from.",
		usedIn: [W],
	},
	docker: {
		summary:
			"Containers for every service since Ultra; Skaion's offline deployments were packaged with Docker and Bash.",
		usedIn: [W, U, E, S],
	},
	"github-actions": {
		summary:
			"Wolverine's trunk-based CI/CD: test-gated stages, parallel jobs, balanced shards, and weekly Bedrock-powered documentation jobs.",
		usedIn: [W],
	},
	jenkins: {
		summary:
			"Rewrote Ultra's pipelines to build and deploy each extracted service separately.",
		usedIn: [U],
	},
	linux: {
		summary:
			"Daily driver (Qubes OS) and deployment target everywhere; Qubes Tools holds my hardening scripts.",
		usedIn: [W, S, "Qubes Tools"],
	},
	bash: {
		summary:
			"Deployment and automation scripts on every project; 25+ shell shortcuts onboarded three developers at Forum Systems.",
		usedIn: [W, S, F, "Qubes Tools"],
	},
	qemu: {
		summary:
			"Generated virtual machine commands from an offline AI service at Skaion.",
		usedIn: [S],
	},
	nginx: {
		summary:
			"Reverse proxy in front of Easy Covers' services and Wolverine's dev stack.",
		usedIn: [W, E],
	},
	opentelemetry: {
		summary: "Traces across Wolverine's services.",
		usedIn: [W],
	},
	prometheus: {
		summary: "Metrics for Wolverine, charted in Grafana.",
		usedIn: [W],
	},
	grafana: {
		summary: "Dashboards over Wolverine's Prometheus metrics.",
		usedIn: [W],
	},
	cloudwatch: {
		summary: "Alarms for Wolverine's production stack.",
		usedIn: [W],
	},
};

export const detailFor = (id: string): TechnologyDetail | undefined =>
	technologyDetails[id];
