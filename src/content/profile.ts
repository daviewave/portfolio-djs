import type { Profile } from "./types";

export const profile: Profile = {
	name: "David Silveira",
	role: "Lead Software Engineer",
	location: "Austin, Texas",
	intro: [
		"Lead software engineer at Cyberhill Partners, where our team took Wolverine — a self-healing cybersecurity knowledge-graph platform — from proof of concept to AWS Marketplace.",
		"Five years across the stack: Django and React, graph databases, LLM pipelines, and the infrastructure underneath.",
		"Off hours I'm usually somewhere deep in Linux; Qubes OS is home.",
	],
	email: "dav.silveira@proton.me",
	resumePath: "/resume.pdf",
	github: "https://github.com/daviewave",
	linkedin: "https://www.linkedin.com/in/david-silveira-03921821b/",
	metrics: [
		{ value: 5, label: "years shipping software" },
		{ value: 20, suffix: "+", label: "contributors on the platform I lead" },
		{ value: 117, label: "Makefile targets behind one workflow" },
		{ value: 3.6, suffix: "x", label: "faster graph analytics after batching" },
	],
};
