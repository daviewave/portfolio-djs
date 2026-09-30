export const currentProjects = [
  {
    title: "Easy Covers",
    description:
      "An AI recruiting platform I founded and built: recruiters call candidates from the app, calls are transcribed with Whisper, and LLM-generated notes feed match scores. This repo is the Next.js frontend; the Django backend is private.",
    image: "/images/easy-covers-full.svg",
    tags: ["Next.js", "TypeScript", "Material UI"],
    source: "https://github.com/Easy-Covers-Software/clg_frontend",
    visit: "https://github.com/Easy-Covers-Software/clg_frontend",
    id: 0,
  },
  {
    title: "PyScripts",
    description:
      "Python scripts I keep coming back to — email analysis, binary reverse engineering, one-off automation. The grab bag that shows how I actually work day to day.",
    image: "/images/py.jpg",
    tags: ["Python", "Automation", "Reverse Engineering"],
    source: "https://github.com/daviewave/pyscripts",
    visit: "https://github.com/daviewave/pyscripts",
    id: 1,
  },
  {
    title: "Qubes Tools",
    description:
      "Scripts and configs for hardening Qubes OS, my daily driver: kernel flags, SELinux policy, firewall management. Written for my own machines, shared in case they help yours.",
    image: "/images/qubes.jpg",
    tags: ["Bash", "Linux", "Qubes OS", "SELinux"],
    source: "https://github.com/daviewave/qubes-tools",
    visit: "https://github.com/daviewave/qubes-tools",
    id: 2,
  },
  {
    title: "Santorini in C",
    description:
      "A college project rebuilt from scratch in C a few years later — partly for the memory-management practice, partly to see how far my code had come.",
    image: "/images/santorini.jpg",
    tags: ["C", "Algorithms", "Data Structures"],
    source: "https://github.com/daviewave/santorini_c-cs230",
    visit: "https://github.com/daviewave/santorini_c-cs230",
    id: 3,
  },
  {
    title: "LeetCode Practice",
    description:
      "My running log of algorithm practice, with notes on the approaches that beat my first attempt.",
    image: "/images/leetcode.jpg",
    tags: ["Algorithms", "Python"],
    source: "https://github.com/daviewave/leetcode-practice",
    visit: "https://github.com/daviewave/leetcode-practice",
    id: 4,
  },
  {
    title: "JavaScripts",
    description:
      "Tampermonkey userscripts that patch privacy and security annoyances in the browser before extensions get around to it.",
    image: "/images/js.jpg",
    tags: ["JavaScript", "Browser Security"],
    source: "https://github.com/daviewave/javascripts",
    visit: "https://github.com/daviewave/javascripts",
    id: 5,
  },
  {
    title: "GreatKart",
    description:
      "A Django e-commerce build — PostgreSQL data models, REST APIs, AWS hosting — from when I was going deep on backend fundamentals.",
    image: "/images/greatkart.png",
    tags: ["Django", "PostgreSQL", "AWS"],
    source: "https://github.com/daviewave/ecommerce-course",
    visit: "https://github.com/daviewave/ecommerce-course",
    id: 6,
  },
  {
    title: "Prompt Pioneer",
    description:
      "A small Next.js and MongoDB app for saving and organizing AI prompts, deployed on Vercel.",
    image: "/images/prompt-pio.png",
    tags: ["Next.js", "MongoDB", "Vercel"],
    source: "https://github.com/daviewave/Prompt-Pioneer",
    visit: "https://prompt-pioneer.vercel.app/",
    id: 7,
  },
  {
    title: "Foode",
    description:
      "A recipe search and meal planner from my Columbia bootcamp — my first group project and first taste of shipping with a team.",
    image: "/images/foodee.jpg",
    tags: ["JavaScript", "HTML", "CSS"],
    source: "https://github.com/mwathomas/project-1",
    visit: "https://mwathomas.github.io/project-1/",
    id: 8,
  },
];

export const TimeLineData = [
  {
    year: "2020",
    title: "Research assistant, Kwak Laboratory",
    text: "Built an R pipeline at UMass Amherst that turned free-text survey responses about the 2018 midterms into structured data and classified them by emotion, showing how framing words shaped voter sentiment.",
  },
  {
    year: "2021",
    title: "UMass Amherst, then Columbia",
    text: "Graduated with a B.S. in Psychology (neuroscience concentration, CS minor), then went straight into Columbia's full-stack web development bootcamp.",
  },
  {
    year: "2022",
    title: "Software Engineer, Forum Systems",
    text: "First engineer hired onto Quantum Sim, an AI healthcare app that later spun out as its own company. Started on React, ended up building Django APIs, an NLP contract-analysis pipeline, and the deployments behind a Blue Cross Blue Shield engagement.",
  },
  {
    year: "2023",
    title: "Founder, Easy Covers",
    text: "Founded an AI recruiting platform and built it from scratch: Django, Flask and Next.js microservices, call transcription with Whisper, LLM-generated notes, and ML match scores. Wrote the business plan and pitched it to venture capital firms.",
  },
  {
    year: "2024",
    title: "Software Engineer (contract), Skaion",
    text: "Government R&D work in a fully offline environment: a Django and React app with 2D/3D graph visualizations, and an on-prem AI service running a local GPT4All model queued through Celery and Redis. Briefed Department of Defense stakeholders, which helped secure further funding.",
  },
  {
    year: "2026",
    title: "Lead Software Engineer, Cyberhill Partners",
    text: "After a stint at Ultra Intelligence & Communications splitting a Django/React monolith into microservices, I now lead Wolverine — a self-healing cybersecurity knowledge-graph platform — which our team took from proof of concept to an agentic AI product on AWS Marketplace.",
  },
];

export const skills = [
  {
    area: "Backend",
    items: ["Python", "Django", "FastAPI", "Flask", "Celery", "WebSockets", "REST APIs", "microservices"],
  },
  {
    area: "Frontend",
    items: ["React", "Next.js", "TypeScript", "TanStack Query", "Redux", "Tailwind CSS", "Material UI", "design systems"],
  },
  {
    area: "AI & Data",
    items: ["AWS Bedrock", "LangChain", "GraphRAG", "LLM guardrails", "NLP", "Whisper", "PostgreSQL", "Neo4j", "Amazon Neptune", "Redis", "openCypher", "SPARQL"],
  },
  {
    area: "Infrastructure",
    items: ["AWS", "Terraform", "CloudFormation", "Docker", "GitHub Actions", "Jenkins", "Linux", "QEMU", "Nginx", "OpenTelemetry", "Prometheus", "Grafana"],
  },
];

export const accomplishments = [
  { number: 5, text: "Years shipping software" },
  { number: 20, text: "Contributors on the platform I lead" },
  { number: 8, text: "Languages I work in" },
];
