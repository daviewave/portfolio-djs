import type { Project } from "./types";

// Built on the job; the code is private, so these are described from my resume.
export const professionalProjects: Project[] = [
	{
		title: "Wolverine",
		description:
			"A self-healing cybersecurity knowledge-graph platform that shows how security tools and frameworks relate. I led it from proof of concept to an agentic AI product on AWS Marketplace.",
		kind: "Cybersecurity knowledge graph",
		year: "2026 to now",
		org: "Cyberhill Partners",
		area: "ai",
		highlights: [
			"Real-time AI chat that streams LLM tokens over WebSockets, with Redis keeping them in order, and GraphRAG that turns plain-English questions into openCypher and SPARQL queries.",
			"A dual-database design: Amazon Neptune for graph analytics and PostgreSQL behind Django for relational data, with asynchronous graph queries through Django Ninja.",
			"A core graph analytics workload made 3.6x faster, from 6.34 s to 1.78 s, by batching sequential round-trips into a few set-based queries.",
			"A no-mocks Playwright suite of 111 end-to-end tests, and GitHub Actions releases to AWS Marketplace with gated promotion and automatic rollback.",
		],
		tags: ["Django", "React", "Amazon Neptune", "AWS Bedrock", "GraphRAG"],
	},
	{
		title: "Wolverine research console",
		description:
			"A Django and React console, replacing a Streamlit prototype, that researches security tools and adds them to the Wolverine graph.",
		kind: "Research tool",
		year: "2026",
		org: "Cyberhill Partners",
		area: "ai",
		highlights: [
			"Tavily search and four LLM families on Bedrock do the research.",
			"A state machine holds every result for CISO approval before it reaches the graph.",
			"Works against either property graphs or RDF graphs.",
		],
		tags: ["Django", "React", "AWS Bedrock", "Tavily"],
	},
	{
		title: "Ultra ADSI\u00ae",
		description:
			"Splitting a monolithic Django and React application into independent services, and separating the real-time path of the company's flagship product from everything that did not need live data.",
		kind: "Platform re-architecture",
		year: "2026",
		org: "Ultra Intelligence & Communications",
		area: "infra",
		highlights: [
			"A container file for each service, with the Jenkins CI/CD scripts updated to build and deploy them separately.",
			"Features without live-data needs moved into Django apps on PostgreSQL, and the C structs and C++ code on the real-time path reworked.",
			"A legacy UI migrated to React and TypeScript with Material UI and feature-scoped Redux stores.",
		],
		tags: ["Django", "React", "TypeScript", "C++", "Jenkins"],
	},
	{
		title: "Offline R&D application",
		description:
			"A full-stack Django and React application for a multi-million-dollar government R&D project, built to run fully offline with no cloud services.",
		kind: "Government R&D",
		year: "2024 to 2025",
		org: "Skaion Corporation",
		area: "infra",
		highlights: [
			"Interactive 2D and 3D graph visualizations, packaged for deployment with Docker and Bash scripts.",
			"An offline AI service that generates QEMU virtual machine commands with a local GPT4All model, queued through Celery and Redis to stay within strict memory limits.",
			"The Django backend later refactored into a command-line tool of modular Python scripts, so each processing step runs on its own.",
		],
		tags: ["Django", "React", "GPT4All", "Celery", "Docker"],
	},
	{
		title: "Quantum Sim",
		description:
			"An AI healthcare app that began inside Forum Systems and later spun out as its own company. I joined as its first external engineer and built its Django and React stack.",
		kind: "AI healthcare app",
		year: "2022 to 2023",
		org: "Forum Systems",
		area: "ai",
		highlights: [
			"An NLP pipeline that extracts text from PDF contracts and scores each one for risk with Word2Vec embeddings, Transformer models and GPT.",
			"A healthcare benefits encoder and an ML product analysis engine, built on a four-person team, that helped win Blue Cross Blue Shield follow-on funding.",
		],
		tags: ["Django", "React", "NLP", "Word2Vec"],
	},
];

// Personal work with a public repository.
export const projects: Project[] = [
	{
		title: "Easy Covers",
		description:
			"The Next.js frontend of the AI recruiting platform I founded. Recruiters call candidates from the browser, get each call transcribed and summarized, and see candidates ranked against every job posting. The Django backend is private.",
		kind: "AI recruiting platform",
		year: "2023 to 2025",
		area: "ai",
		highlights: [
			"In-browser calling with a screen for every call state, from ringing through no-answer to complete, then transcription and notes once the call ends.",
			"Candidate rankings for each job posting with a score breakdown, next to full candidate profiles and their resumes.",
			"Cover letter and follow-up email generation with simple and advanced adjustments, a rich-text editor and PDF export.",
			"About 140 typed files, with state kept in React context and reducers, one per section of the app.",
		],
		tags: ["Next.js", "TypeScript", "Material UI", "Tiptap"],
		url: "https://github.com/Easy-Covers-Software/clg_frontend",
	},
	{
		title: "PyScripts",
		description:
			"Command-line scripts I keep coming back to for security and forensics chores, all built on one shared module for prompts, file handling and shell commands.",
		kind: "Tooling",
		year: "2025 to 2026",
		area: "backend",
		highlights: [
			"Pulls decompiled C out of a binary with radare2, for every function or only the ones picked from an interactive list.",
			"Reads a saved email and lays out its routing, SPF, DKIM and DMARC headers.",
			"Backs up a connected iPhone through libimobiledevice, checking its own dependencies first.",
		],
		tags: ["Python", "radare2", "GPT4All"],
		url: "https://github.com/daviewave/pyscripts",
	},
	{
		title: "Qubes Tools",
		description:
			"The scripts and configs I use to set up and harden Qubes OS, my daily driver. Written for my own machines, shared in case they help yours.",
		kind: "System hardening",
		year: "2025",
		area: "infra",
		highlights: [
			"Numbered setup scripts for a fresh template: kernel sysctl hardening, module blacklists, SELinux booleans and user lockdown.",
			"dom0 hardening that strips remote-access packages and their config, plus nftables anti-spoofing rules.",
			"A Qubes Builder pipeline for Kali templates signed through split GPG, with the walkthrough notes I wrote along the way.",
		],
		tags: ["Bash", "Qubes OS", "SELinux", "nftables"],
		url: "https://github.com/daviewave/qubes-tools",
	},
	{
		title: "Santorini in C",
		description:
			"A college assignment rebuilt from scratch in C a few years later, partly for the memory-management practice and partly to see how far my code had come.",
		kind: "Systems practice",
		year: "2025",
		area: "backend",
		highlights: [
			"A terminal board game against a computer opponent, with every move validated before it lands.",
			"Movement rules written by hand: straight-line checks, blocked paths, and building levels that rise or fall along the route taken.",
		],
		tags: ["C", "Game logic", "Data structures"],
		url: "https://github.com/daviewave/santorini_c-cs230",
	},
	{
		title: "LeetCode Practice",
		description:
			"My running log of algorithm practice in Python, organized by the pattern each problem teaches instead of by problem number.",
		kind: "Practice",
		year: "2025",
		area: "backend",
		highlights: [
			"64 solutions across sliding window and two pointers, trees, linked lists, hash maps, stacks and queues, and bit manipulation.",
			"Each one opens with its time and space complexity and the reasoning behind it.",
		],
		tags: ["Python", "Algorithms"],
		url: "https://github.com/daviewave/leetcode-practice",
	},
	{
		title: "JavaScripts",
		description:
			"Tampermonkey userscripts for seeing what a page does after it loads, and for removing the parts I don't want.",
		kind: "Browser tooling",
		year: "2025",
		area: "frontend",
		highlights: [
			"A MutationObserver logger that records every node added, attribute changed and text edit, to catch scripts injected after load.",
			"A cleanup script for one site that strips preloads, preconnects, hidden elements and leftover metadata.",
		],
		tags: ["JavaScript", "Tampermonkey"],
		url: "https://github.com/daviewave/javascripts",
	},
	{
		title: "GreatKart",
		description:
			"A complete Django storefront, built while working through a course when I was going deep on backend fundamentals.",
		kind: "E-commerce app",
		year: "2022 to 2023",
		area: "backend",
		highlights: [
			"Accounts with email verification and password reset, a cart, checkout with tax, payments and order history.",
			"Ran on Elastic Beanstalk with S3 for media and SES for verification and order emails, until I took it down to stop the bill.",
		],
		tags: ["Django", "Python", "AWS"],
		url: "https://github.com/daviewave/ecommerce-course",
	},
	{
		title: "Prompt Pioneer",
		description:
			"A small social app for sharing AI prompts and trying them out before you copy them.",
		kind: "Social app",
		year: "2023",
		area: "frontend",
		highlights: [
			"A paginated feed of shared prompts, Google sign-in, and a profile page for editing or deleting your own.",
			"A try-it page that sends any prompt to OpenAI through LangChain so it can be tuned in place.",
			"Python and Bash scripts that seed MongoDB with test users and prompts.",
		],
		tags: ["Next.js", "MongoDB", "LangChain", "Tailwind CSS"],
		url: "https://github.com/daviewave/Prompt-Pioneer",
	},
	{
		title: "Foode",
		description:
			"A recipe finder from my Columbia bootcamp: my first group project and first taste of shipping with a team.",
		kind: "Bootcamp project",
		year: "2021",
		area: "frontend",
		highlights: [
			"Enter the ingredients already in the fridge and get recipes that use them.",
			"Built by a team of five in plain JavaScript, HTML and CSS.",
		],
		tags: ["JavaScript", "HTML", "CSS"],
		url: "https://github.com/mwathomas/project-1",
		liveUrl: "https://mwathomas.github.io/project-1/",
	},
];
