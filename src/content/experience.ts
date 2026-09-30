import type { Role } from "./types";

export const roles: Role[] = [
	{
		year: "2026",
		title: "Lead Software Engineer",
		org: "Cyberhill Partners",
		summary:
			"After a stint at Ultra Intelligence & Communications splitting a Django/React monolith into microservices, I now lead Wolverine — a self-healing cybersecurity knowledge-graph platform — which our team took from proof of concept to an agentic AI product on AWS Marketplace.",
		area: "ai",
	},
	{
		year: "2024",
		title: "Software Engineer (contract)",
		org: "Skaion Corporation",
		summary:
			"Government R&D work in a fully offline environment: a Django and React app with 2D/3D graph visualizations, and an on-prem AI service running a local GPT4All model queued through Celery and Redis. Briefed Department of Defense stakeholders, which helped secure further funding.",
		area: "infra",
	},
	{
		year: "2023",
		title: "Founder",
		org: "Easy Covers Software",
		summary:
			"Founded an AI recruiting platform and built it from scratch: Django, Flask and Next.js microservices, call transcription with Whisper, LLM-generated notes, and ML match scores. Wrote the business plan and pitched it to venture capital firms.",
		area: "backend",
	},
	{
		year: "2022",
		title: "Software Engineer",
		org: "Forum Systems",
		summary:
			"First engineer hired onto Quantum Sim, an AI healthcare app that later spun out as its own company. Started on React, ended up building Django APIs, an NLP contract-analysis pipeline, and the deployments behind a Blue Cross Blue Shield engagement.",
		area: "frontend",
	},
	{
		year: "2021",
		title: "B.S. Psychology, then Columbia's web development bootcamp",
		org: "UMass Amherst and Columbia University",
		summary:
			"Graduated with a neuroscience concentration and a computer science minor, then went straight into Columbia's full-stack web development bootcamp.",
		area: "frontend",
	},
	{
		year: "2020",
		title: "Research assistant",
		org: "Kwak Laboratory, UMass Amherst",
		summary:
			"Built an R pipeline that turned free-text survey responses about the 2018 midterms into structured data and classified them by emotion, showing how framing words shaped voter sentiment.",
		area: "ai",
	},
];
