import type { Project } from "./types";

export const projects: Project[] = [
	{
		title: "Easy Covers",
		description:
			"An AI recruiting platform I founded and built: recruiters call candidates from the app, calls are transcribed with Whisper, and LLM-generated notes feed match scores. This repo is the Next.js frontend; the Django backend is private.",
		kind: "AI recruiting platform",
		area: "ai",
		tags: ["Next.js", "TypeScript", "Material UI"],
		url: "https://github.com/Easy-Covers-Software/clg_frontend",
	},
	{
		title: "PyScripts",
		description:
			"Python scripts I keep coming back to — email analysis, binary reverse engineering, one-off automation. The grab bag that shows how I actually work day to day.",
		kind: "Tooling",
		area: "backend",
		tags: ["Python", "Automation", "Reverse engineering"],
		url: "https://github.com/daviewave/pyscripts",
	},
	{
		title: "Qubes Tools",
		description:
			"Scripts and configs for hardening Qubes OS, my daily driver: kernel flags, SELinux policy, firewall management. Written for my own machines, shared in case they help yours.",
		kind: "System hardening",
		area: "infra",
		tags: ["Bash", "Linux", "Qubes OS", "SELinux"],
		url: "https://github.com/daviewave/qubes-tools",
	},
	{
		title: "Santorini in C",
		description:
			"A college project rebuilt from scratch in C a few years later — partly for the memory-management practice, partly to see how far my code had come.",
		kind: "Systems practice",
		area: "backend",
		tags: ["C", "Algorithms", "Data structures"],
		url: "https://github.com/daviewave/santorini_c-cs230",
	},
	{
		title: "LeetCode Practice",
		description:
			"My running log of algorithm practice, with notes on the approaches that beat my first attempt.",
		kind: "Practice",
		area: "backend",
		tags: ["Algorithms", "Python"],
		url: "https://github.com/daviewave/leetcode-practice",
	},
	{
		title: "JavaScripts",
		description:
			"Tampermonkey userscripts that patch privacy and security annoyances in the browser before extensions get around to it.",
		kind: "Browser tooling",
		area: "frontend",
		tags: ["JavaScript", "Browser security"],
		url: "https://github.com/daviewave/javascripts",
	},
	{
		title: "GreatKart",
		description:
			"A Django e-commerce build — PostgreSQL data models, REST APIs, AWS hosting — from when I was going deep on backend fundamentals.",
		kind: "E-commerce app",
		area: "backend",
		tags: ["Django", "PostgreSQL", "AWS"],
		url: "https://github.com/daviewave/ecommerce-course",
	},
	{
		title: "Prompt Pioneer",
		description:
			"A small Next.js and MongoDB app for saving and organizing AI prompts, deployed on Vercel.",
		kind: "Productivity app",
		area: "frontend",
		tags: ["Next.js", "MongoDB", "Vercel"],
		url: "https://github.com/daviewave/Prompt-Pioneer",
	},
	{
		title: "Foode",
		description:
			"A recipe search and meal planner from my Columbia bootcamp — my first group project and first taste of shipping with a team.",
		kind: "Bootcamp project",
		area: "frontend",
		tags: ["JavaScript", "HTML", "CSS"],
		url: "https://github.com/mwathomas/project-1",
	},
];
