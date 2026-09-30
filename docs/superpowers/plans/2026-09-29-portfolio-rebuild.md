# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js/styled-components portfolio with a Vite + React 19 + TypeScript + Tailwind v4 site whose identity is typography and a labeled stack graph, with passive scroll/cursor interactions gated by motion preference.

**Architecture:** A single-page app: `pages/Home` composes a sticky panel and a scrolling ledger of sections from typed `content/` modules. Three motion tiers (CSS → lazily loaded Motion → a d3-force canvas) hang off one `useMotionPreference()` gate, one rAF scheduler and one pointer store in `lib/motion`. Graph math lives in `lib/graph` as pure functions so it is unit-tested without a browser; the `StackGraph` component only draws.

**Tech Stack:** Vite 8, React 19.3, TypeScript 7 (strict), Tailwind v4 (`@tailwindcss/vite`), Motion 13 (`motion/react`), d3-force 3, `@fontsource-variable/recursive`, Biome 2, Vitest 5 + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-09-29-portfolio-rebuild-design.md`

## Global Constraints

- Node is `/home/linuxbrew/.linuxbrew/bin/node` (26.x); every shell command exports `PATH="/home/linuxbrew/.linuxbrew/bin:$PATH" npm_config_cache="$TMPDIR/npm-cache"`.
- Dev server: `npm run dev` on port **3000** (`server.port: 3000`, `strictPort: true`).
- Tokens only: components use `bg-canvas`, `text-ink`, `text-muted`, `border-line`, `bg-raised`, `text-area-*`; `--color-*: initial` in `@theme` so no raw palette class exists; never a hex in a component; canvas colors are read from CSS custom properties at runtime.
- Units: `rem`/`%`/`vh`/`vw` only, never `px` (arbitrary values like `min-h-[6.5rem]`, conversion `px / 16`).
- Tailwind classes are literal strings; variants live in `X.styles.ts` as `<thing>Styles` `as const`, built with `cn()`; a `.styles.ts` with fewer than three constants is deleted and inlined.
- `const fn = () => {}` everywhere except component signatures (`function Foo()` in `.tsx`); `.tsx` only for files with JSX; one `index.ts` barrel per `components/` directory; contexts typed, hooks throw outside their provider; clickable = `<button type="button">`; inputs have real labels; effects clean up.
- Biome: tabs, double quotes, organized imports; `npm run check` (biome + tsc + vitest) must pass before every commit.
- Motion: animate `transform`, `opacity` and CSS custom properties only; un-animated state is the final layout (CLS 0); everything gated by `useMotionPreference()`; no smooth-scroll lib, no custom cursor, no preloader.
- Copy: sentence case, no ALL-CAPS labels, no `→`, no "·" joined meta strings; content text is the resume-synced copy already in the repo history (`076187d:src/constants/constants.js`).
- Commits on branch `redesign`, no AI attribution lines, subject in imperative mood.
- Lighthouse cannot run here (no Chromium). Proxies: `vite build` gzip sizes (initial JS ≤ 150 kB), axe-core run inside Firefox (0 violations), CLS measured with a `PerformanceObserver` in-page (0), console clean.

## Review Focus

1. **Firefox without CSS scroll timelines**: reveals, rail growth and heading morph must still happen through Motion/IO — test: `Reveal` renders hidden-then-visible via the mocked IntersectionObserver callback (Task 7).
2. **`prefers-reduced-motion: reduce`**: every animated element renders its final state immediately, the graph renders a still frame, counters show the final number — tests in Tasks 6 and 7.
3. **Touch devices (`pointer: coarse`)**: the graph must not try to follow a pointer and must not steal scrolling (`touch-action: pan-y`) — test: `StackGraph` with `finePointer: false` attaches no pointer listeners (Task 6).
4. **Theme chosen before hydration**: a stored `light` must not flash dark and the toggle must reflect it — tests: `readTheme()` precedence (stored > system) and provider adopting the `data-theme` attribute (Task 4).
5. **Content drift**: every project, role and technology has non-empty fields and every technology `links` id resolves — test in Task 2 so a typo never renders a dangling edge or blank row.

---

### Task 1: Scaffold the Vite app and tooling

**Files:**
- Delete: `src/` (all), `next.config.js`, `yarn.lock`, `public/vercel.svg`, `public/images/*.pdf`
- Create: `package.json` (rewrite), `vite.config.ts`, `tsconfig.json`, `biome.json`, `vitest.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/lib/utils.ts`, `src/test/setup.ts`, `src/test/render.tsx`, `.gitignore` (rewrite), `README.md` (rewrite later in Task 10)

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` from `src/lib/utils.ts`; test helper `renderApp(ui: ReactElement)` from `src/test/render.tsx`; npm scripts `dev`, `build`, `preview`, `test`, `lint`, `format`, `typecheck`, `check`.

- [ ] **Step 1: Remove the Next app**

```bash
cd /var/home/slave/github/portfolio-djs && git rm -rq src next.config.js yarn.lock public/vercel.svg public/images/DavidSilveira2.pdf package-lock.json && rm -rf node_modules .next out
```

- [ ] **Step 2: Write `package.json`**

```json
{
	"name": "portfolio",
	"private": true,
	"version": "1.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite",
		"build": "tsc -b && vite build",
		"preview": "vite preview --port 3000",
		"test": "vitest run",
		"lint": "biome check .",
		"format": "biome format --write .",
		"typecheck": "tsc -b",
		"check": "biome check . && tsc -b && vitest run"
	},
	"dependencies": {
		"@fontsource-variable/recursive": "^5.3.0",
		"d3-force": "^3.0.0",
		"motion": "^13.4.6",
		"react": "^19.3.0",
		"react-dom": "^19.3.0"
	},
	"devDependencies": {
		"@biomejs/biome": "^2.5.14",
		"@tailwindcss/vite": "^4.3.3",
		"@testing-library/dom": "^10.4.2",
		"@testing-library/jest-dom": "^7.0.1",
		"@testing-library/react": "^16.3.3",
		"@testing-library/user-event": "^14.6.7",
		"@types/d3-force": "^3.0.10",
		"@types/react": "^19.3.0",
		"@types/react-dom": "^19.3.0",
		"@vitejs/plugin-react": "^6.1.1",
		"clsx": "^2.1.1",
		"jsdom": "^30.1.1",
		"tailwind-merge": "^3.3.1",
		"tailwindcss": "^4.3.3",
		"typescript": "^7.0.2",
		"vite": "^8.3.1",
		"vitest": "^5.0.2"
	}
}
```

(`clsx` and `tailwind-merge` are runtime deps in practice — move them to `dependencies`; if `typescript@7` breaks `tsc -b` with any plugin, pin `^6.0.3`.)

- [ ] **Step 3: Configs**

`vite.config.ts`:
```ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: { port: 3000, strictPort: true },
	resolve: { alias: { "@": "/src" } },
});
```

`tsconfig.json`:
```json
{
	"compilerOptions": {
		"target": "ES2022",
		"lib": ["ES2022", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"moduleResolution": "bundler",
		"jsx": "react-jsx",
		"strict": true,
		"noEmit": true,
		"skipLibCheck": true,
		"isolatedModules": true,
		"types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"],
		"paths": { "@/*": ["./src/*"] }
	},
	"include": ["src", "vite.config.ts", "vitest.config.ts"]
}
```

`biome.json`:
```json
{
	"$schema": "https://biomejs.dev/schemas/2.5.14/schema.json",
	"formatter": { "indentStyle": "tab" },
	"javascript": { "formatter": { "quoteStyle": "double" } },
	"css": { "parser": { "tailwindDirectives": true } },
	"assist": { "actions": { "source": { "organizeImports": "on" } } },
	"linter": { "enabled": true, "rules": { "recommended": true } },
	"files": { "includes": ["src/**", "*.ts", "index.html"] }
}
```

`vitest.config.ts`:
```ts
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: "jsdom",
			globals: true,
			setupFiles: ["./src/test/setup.ts"],
			unstubGlobals: true,
			css: false,
		},
	}),
);
```

- [ ] **Step 4: Test infrastructure**

`src/test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";

class ObserverStub {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	takeRecords = vi.fn(() => []);
}

beforeEach(() => {
	vi.stubGlobal("IntersectionObserver", ObserverStub);
	vi.stubGlobal("ResizeObserver", ObserverStub);
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
	Element.prototype.scrollIntoView = vi.fn();
});
```

`src/test/render.tsx`:
```tsx
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

export const renderApp = (ui: ReactElement) => render(ui);
```

- [ ] **Step 5: Tokens and shell**

`src/index.css`:
```css
@import "tailwindcss";
@import "@fontsource-variable/recursive/full.css";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

:root {
	color-scheme: light;
	--canvas: #f3f4f6;
	--raised: #ffffff;
	--ink: #16181d;
	--muted: #5b6270;
	--line: #d9dce2;
	--area-backend: #3f7d5c;
	--area-frontend: #b07a2a;
	--area-ai: #4f6ab8;
	--area-infra: #a5566a;
}
[data-theme="dark"] {
	color-scheme: dark;
	--canvas: #121417;
	--raised: #1a1d21;
	--ink: #e6e8eb;
	--muted: #9aa2ad;
	--line: #262a30;
	--area-backend: #6fbf93;
	--area-frontend: #d9a85a;
	--area-ai: #8ea2e6;
	--area-infra: #d68aa0;
}

@theme inline {
	--color-*: initial;
	--color-canvas: var(--canvas);
	--color-raised: var(--raised);
	--color-ink: var(--ink);
	--color-muted: var(--muted);
	--color-line: var(--line);
	--color-area-backend: var(--area-backend);
	--color-area-frontend: var(--area-frontend);
	--color-area-ai: var(--area-ai);
	--color-area-infra: var(--area-infra);
	--font-sans: "Recursive Variable", ui-sans-serif, system-ui, sans-serif;
	--font-mono: "Recursive Variable", ui-monospace, monospace;
	--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

@layer base {
	html { scroll-behavior: smooth; }
	body {
		@apply bg-canvas text-ink font-sans antialiased;
		font-variation-settings: "MONO" 0, "CASL" 0;
	}
	.font-mono { font-variation-settings: "MONO" 1, "CASL" 0; }
	:focus-visible { @apply outline-2 outline-offset-2 outline-ink; }
	@media (prefers-reduced-motion: reduce) {
		html { scroll-behavior: auto; }
	}
}
```

`index.html` with the pre-hydration theme script (its source string lives in `src/lib/theme/init.ts` from Task 4; until then inline the same snippet):
```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>David Silveira - Software Engineer</title>
		<meta name="description" content="Lead software engineer building AI products end to end: Django, React, graph databases, and AWS." />
		<script>
			try {
				var t = localStorage.getItem("theme");
				if (t !== "light" && t !== "dark") t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
				document.documentElement.dataset.theme = t;
			} catch (e) {}
		</script>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>
```

`src/main.tsx`, `src/App.tsx` (renders `<h1>David Silveira</h1>` for now), `src/lib/utils.ts`:
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

- [ ] **Step 6: Smoke test**

`src/App.test.tsx`:
```tsx
import { screen } from "@testing-library/react";
import App from "./App";
import { renderApp } from "./test/render";

test("renders the name", () => {
	renderApp(<App />);
	expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("David Silveira");
});
```

- [ ] **Step 7: Install, check, commit**

Run: `npm install` (allowed host `registry.npmjs.org`), then `npm run check`. Expected: biome clean, tsc clean, 1 test passing. Verify `npm run build` emits `dist/` and print gzip sizes. Commit: `Scaffold Vite, React 19, Tailwind v4, Biome and Vitest`.

---

### Task 2: Typed content modules

**Files:**
- Create: `src/content/profile.ts`, `src/content/skills.ts`, `src/content/experience.ts`, `src/content/projects.ts`, `src/content/index.ts`, `src/content/content.test.ts`

**Interfaces (Produces):**
```ts
// skills.ts
export type Area = "backend" | "frontend" | "ai" | "infra";
export interface AreaInfo { id: Area; label: string; token: string } // token = CSS var name, e.g. "--area-backend"
export interface Technology { id: string; label: string; area: Area; weight: 1 | 2 | 3; links: string[] }
export const areas: AreaInfo[];
export const technologies: Technology[];
// experience.ts
export interface Role { year: string; title: string; org: string; summary: string; area: Area }
export const roles: Role[]; // newest first
// projects.ts
export interface Project { title: string; description: string; kind: string; area: Area; tags: string[]; url: string }
export const projects: Project[];
// profile.ts
export interface Metric { value: number; suffix?: string; label: string }
export interface Profile { name: string; role: string; location: string; intro: string[]; email: string; resumePath: string; github: string; linkedin: string; metrics: Metric[] }
export const profile: Profile;
```

- [ ] **Step 1: Failing tests** (`content.test.ts`): every technology `links` id exists in `technologies`; no empty strings in any field of roles/projects/profile.intro; `roles` sorted newest first; at least 25 technologies covering all four areas; metrics values > 0.
- [ ] **Step 2: Write the modules.** Copy from `git show 076187d:src/constants/constants.js` (projects, TimeLineData → roles with `area` chosen per role, skills → technologies). Technologies (≥ 30) with weights: 3 for Python/Django/React/TypeScript/PostgreSQL/AWS; 2 for FastAPI/Celery/Neo4j/Neptune/Bedrock/GraphRAG/Docker/Terraform/GitHub Actions/Next.js; 1 for the rest. Links encode real co-use: django↔postgresql, django↔celery, celery↔redis, bedrock↔graphrag↔langchain, neptune↔opencypher↔sparql, react↔typescript↔nextjs, terraform↔aws, cloudformation↔aws, docker↔github-actions, otel↔prometheus↔grafana, whisper↔nlp, etc. Metrics: `{value: 5, label: "years shipping software"}`, `{value: 20, suffix: "+", label: "contributors on the platform I lead"}`, `{value: 117, label: "Makefile targets behind one workflow"}`, `{value: 3.6, suffix: "x", label: "faster graph analytics after batching"}`. `profile.intro` = 3 sentences from the previous hero copy; `resumePath: "/resume.pdf"`.
- [ ] **Step 3: Run tests → pass. Commit** `Add typed content modules synced to the resume`.

---

### Task 3: Motion primitives (`lib/motion`)

**Files:**
- Create: `src/lib/motion/scheduler.ts`, `src/lib/motion/pointer.ts`, `src/lib/motion/useMotionPreference.ts`, `src/lib/motion/index.ts`, `src/lib/motion/motion.test.ts`

**Interfaces (Produces):**
```ts
export const scheduler: { add: (cb: (time: number) => void) => () => void; readonly active: boolean };
export interface PointerState { x: number; y: number; active: boolean }
export const createPointerStore: (target: Window | HTMLElement) => { get: () => PointerState; start: () => void; stop: () => void };
export const useMotionPreference: () => { reduced: boolean; finePointer: boolean };
```

- [ ] **Step 1: Failing tests**: scheduler runs one rAF frame per tick for two subscribers (stub `requestAnimationFrame`), stops when the last unsubscribes; pointer store records `pointermove` coords and `active=false` on `pointerleave`, uses `{ passive: true }`; `useMotionPreference` reflects `matchMedia("(prefers-reduced-motion: reduce)").matches` and `(hover: hover) and (pointer: fine)`, and updates on the `change` event (`renderHook`).
- [ ] **Step 2: Implement** — scheduler keeps a `Set`, schedules `requestAnimationFrame` only while the set is non-empty; pointer store writes into one mutable object (no React state); the hook subscribes with `addEventListener("change")` and cleans up.
- [ ] **Step 3: Tests pass → commit** `Add motion primitives: rAF scheduler, pointer store, preference hook`.

---

### Task 4: Theme layer and toggle

**Files:**
- Create: `src/lib/theme/init.ts`, `src/lib/theme/theme.ts`, `src/lib/theme/transition.ts`, `src/lib/theme/index.ts`, `src/lib/theme/theme.test.ts`, `src/components/ThemeProvider/ThemeProvider.tsx`, `src/components/ThemeProvider/ThemeProvider.types.ts`, `src/components/ThemeProvider/index.ts`, `src/components/ThemeToggle/ThemeToggle.tsx`, `src/components/ThemeToggle/index.ts`, `src/components/index.ts`
- Modify: `index.html` (replace inline script body with the exported `THEME_INIT_SCRIPT` content — keep identical text; a test asserts equality by reading `index.html`)

**Interfaces (Produces):**
```ts
export type Theme = "light" | "dark";
export const THEME_INIT_SCRIPT: string;
export const readTheme: () => Theme;            // stored > system > "light"
export const applyTheme: (theme: Theme) => void; // sets dataset.theme + localStorage
export const switchThemeWithWipe: (next: Theme, origin?: { x: number; y: number }) => Promise<void>; // uses document.startViewTransition when present, else applyTheme
// ThemeProvider
export interface ThemeContextValue { theme: Theme; toggle: (origin?: { x: number; y: number }) => void }
export function ThemeProvider(props: { children: ReactNode }): JSX.Element;
export const useTheme: () => ThemeContextValue; // throws outside provider
// ThemeToggle: <button type="button" aria-label="Switch to dark theme"> with lucide-free inline SVG sun/moon
```

- [ ] **Step 1: Failing tests**: `readTheme` precedence; `applyTheme` writes attribute and storage and swallows storage errors; `switchThemeWithWipe` falls back when `startViewTransition` is undefined and calls it when defined; `useTheme` throws outside the provider; provider adopts an existing `data-theme="light"` on mount; toggle button flips the attribute and its `aria-label`; `index.html` contains `THEME_INIT_SCRIPT` verbatim.
- [ ] **Step 2: Implement.** Wipe: `document.startViewTransition(() => applyTheme(next))` then animate `::view-transition-new(root)` with a `clip-path: circle()` keyframe from the origin via `document.documentElement.animate(...)`; CSS in `index.css`: `::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }` and `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none } }`.
- [ ] **Step 3: Tests pass → commit** `Add theme layer with pre-hydration init and view-transition wipe`.

---

### Task 5: Graph model (`lib/graph`, pure)

**Files:**
- Create: `src/lib/graph/build.ts`, `src/lib/graph/simulation.ts`, `src/lib/graph/draw.ts`, `src/lib/graph/index.ts`, `src/lib/graph/graph.test.ts`

**Interfaces (Produces):**
```ts
import type { SimulationNodeDatum, SimulationLinkDatum, Simulation } from "d3-force";
export interface GraphNode extends SimulationNodeDatum { id: string; label: string; area: Area; radius: number }
export interface GraphLink extends SimulationLinkDatum<GraphNode> { kind: "couse" | "area" }
export interface Graph { nodes: GraphNode[]; links: GraphLink[] }
export const buildGraph: (technologies: Technology[]) => Graph;  // radius = 4 + weight * 2.5 (in CSS px units of the canvas coordinate space)
export const createSimulation: (graph: Graph, width: number, height: number) => Simulation<GraphNode, GraphLink>; // stopped; forces: link(distance by kind), manyBody(-40), center, collide(r+6), x/y toward center (0.04)
export const settle: (sim: Simulation<GraphNode, GraphLink>, ticks?: number) => void; // ticks default 300
export const applyPointerForce: (nodes: GraphNode[], pointer: { x: number; y: number }, radius: number, strength: number) => void; // nudges vx/vy toward pointer within radius
export interface Palette { ink: string; muted: string; line: string; areas: Record<Area, string> }
export const drawGraph: (ctx: CanvasRenderingContext2D, graph: Graph, opts: { width: number; height: number; dpr: number; palette: Palette; hovered?: string; pointer?: { x: number; y: number } | null; labelFont: string }) => void;
```

- [ ] **Step 1: Failing tests**: `buildGraph` creates one node per technology and one `couse` link per unique undirected pair from `links` (no duplicates, no self links) plus `area` links only when a technology has no co-use link (so no node is isolated); `createSimulation`+`settle` leaves every node within the bounds `[radius, width-radius]` and moves nodes (positions non-zero); `applyPointerForce` increases velocity toward the pointer for a node inside the radius and leaves a far node untouched; `drawGraph` on a stubbed 2D context calls `arc` once per node and `fillText` once per node and `stroke` at least once per link (spy on a fake ctx object).
- [ ] **Step 2: Implement** with `forceSimulation`, `forceLink().id(d => d.id).distance(l => l.kind === "couse" ? 46 : 80).strength(l => l.kind === "couse" ? 0.7 : 0.15)`, `forceManyBody().strength(-40)`, `forceCollide(d => d.radius + 6)`, `forceX(width/2).strength(0.04)`, `forceY(height/2).strength(0.05)`; clamp positions to bounds inside `settle` and in the draw loop. Draw: links first (`line` color, alpha 0.5, hovered edges full `area` color), nodes as filled circles in area color (hovered ring), labels in `labelFont` (`muted`, hovered `ink`) offset right of the node; labels for weight-1 nodes only when hovered or within 120 px of the pointer.
- [ ] **Step 3: Tests pass → commit** `Add pure graph model: build, simulate, draw`.

---

### Task 6: `StackGraph` component

**Files:**
- Create: `src/pages/Home/components/StackGraph/StackGraph.tsx`, `StackGraph.types.ts`, `StackGraph.test.tsx`, `index.ts`

**Interfaces:**
- Consumes: `buildGraph/createSimulation/settle/applyPointerForce/drawGraph` (Task 5), `scheduler`, `createPointerStore`, `useMotionPreference` (Task 3), `technologies`, `areas` (Task 2).
- Produces: `export function StackGraph(props: { className?: string }): JSX.Element` — renders `<div class="relative aspect-[16/9] w-full ...">` containing `<canvas role="img" aria-label="Graph of the technologies I work with, grouped by area">` and a `VisuallyHidden` `<ul>` listing every technology grouped by area.

- [ ] **Step 1: Failing tests**: renders the hidden list with one item per technology; with `reduced: true` the component calls `settle` once and never subscribes to `scheduler` (spy via `vi.mock("@/lib/motion")`); with `finePointer: false` no `pointermove` listener is attached (spy `addEventListener` on the wrapper); unmount removes the scheduler subscription and `ResizeObserver`.
- [ ] **Step 2: Implement.** On mount: measure the wrapper (ResizeObserver), build graph + simulation sized to the box, `settle(sim, 120)` for an initial pose, then subscribe to `scheduler`: each frame `sim.tick()` while `sim.alpha() > sim.alphaMin()` (settles ≈3 s with `alphaDecay` default), apply pointer force when the pointer is active and `finePointer`, find `hovered` via `sim.find(x, y, 24)`, and `drawGraph`. Palette read once per theme change via `getComputedStyle(canvas)` for `--ink/--muted/--line/--area-*` (a `MutationObserver` on `documentElement`'s `data-theme` triggers a re-read). Pause when the wrapper is not intersecting or `document.hidden`. Reduced motion: `settle(sim, 300)`, draw once, and redraw only on hover (pointer listener without the force). `touch-action: pan-y` on the canvas.
- [ ] **Step 3: Tests pass → commit** `Add the stack graph canvas`.

---

### Task 7: Reading-coupled motion components and hooks

**Files:**
- Create: `src/components/Reveal/Reveal.tsx`, `Reveal.types.ts`, `Reveal.test.tsx`, `index.ts`; `src/components/MorphHeading/MorphHeading.tsx`, `index.ts`; `src/components/ProgressRail/ProgressRail.tsx`, `ProgressRail.types.ts`, `index.ts`; `src/components/VisuallyHidden/VisuallyHidden.tsx`, `index.ts`; `src/pages/Home/hooks/useScrollSpy.ts`, `useScrollSpy.test.ts`; `src/pages/Home/hooks/useCountUp.ts`, `useCountUp.test.ts`
- Modify: `src/components/index.ts` (barrel), `src/index.css` (Tier-1 CSS below)

**Interfaces (Produces):**
```ts
export function Reveal(props: { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" | "section" }): JSX.Element; // m.[as] whileInView fade+8px-rise once; plain element when reduced
export function MorphHeading(props: { children: ReactNode; id?: string; level?: 1 | 2; className?: string }): JSX.Element; // sets data-inview when seen (useInView once); CSS morphs MONO 1→0, CASL 0→1
export function ProgressRail(props: { sections: { id: string; label: string }[]; activeId: string | null }): JSX.Element; // fixed right-edge rail; scaleY from useScroll().scrollYProgress; one <a href="#id"> per section
export function VisuallyHidden(props: { children: ReactNode; as?: "span" | "ul" | "div" }): JSX.Element;
export const useScrollSpy: (ids: string[]) => string | null; // IntersectionObserver with rootMargin "-40% 0px -55% 0px"
export const useCountUp: (target: number, active: boolean, durationMs?: number) => number; // Motion animate(); returns target immediately when reduced
```

Tier-1 CSS added to `index.css`:
```css
@layer components {
	.morph { font-variation-settings: "MONO" 1, "CASL" 0; transition: font-variation-settings 900ms var(--ease-out-expo); }
	.morph[data-inview="true"] { font-variation-settings: "MONO" 0, "CASL" 1; }
	.dim-siblings:has(> :hover) > :not(:hover) { opacity: 0.45; transition: opacity 200ms; }
	@media (prefers-reduced-motion: reduce) { .morph { transition: none; font-variation-settings: "MONO" 0, "CASL" 1; } }
	@supports (animation-timeline: scroll()) {
		@media (prefers-reduced-motion: no-preference) {
			.rail-line { transform-origin: top; animation: rail-grow linear both; animation-timeline: view(); animation-range: entry 0% cover 60%; }
		}
	}
	@keyframes rail-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
}
```

- [ ] **Step 1: Failing tests**: `Reveal` under reduced renders a plain element with children and no `style` opacity 0; under normal motion it renders (mock `motion/react` `m` as plain elements and `LazyMotion` passthrough) — assert children present; `useScrollSpy` returns the id whose mocked IO entry has `isIntersecting: true` (capture the IO callback from the stub); `useCountUp(117, true)` under reduced returns 117 immediately and under normal motion ends at 117 (fake timers + mocked `animate` calling `onUpdate` with the final value); `ProgressRail` renders one link per section and marks the active one `aria-current="true"`; `MorphHeading` has class `morph` and toggles `data-inview` when the IO fires.
- [ ] **Step 2: Implement** with `LazyMotion features={domAnimation}` mounted once in `App` (`strict`), `m.div` in `Reveal`, `useInView` from `motion/react` in `MorphHeading` (`{ once: true, amount: 0.6 }`), `useScroll` in `ProgressRail`.
- [ ] **Step 3: Tests pass → commit** `Add reveal, heading morph, progress rail and scroll hooks`.

---

### Task 8: Home page composition

**Files:**
- Create: `src/pages/Home/HomePage.tsx`, `Home.types.ts`, `Home.styles.ts`, `HomePage.test.tsx`, `components/index.ts`, `components/StickyPanel/StickyPanel.tsx` (+ `index.ts`), `components/ExperienceRail/ExperienceRail.tsx` (+ `ExperienceRail.styles.ts`, `index.ts`), `components/Metrics/Metrics.tsx` (+ `index.ts`), `components/ProjectLedger/ProjectLedger.tsx` (+ `ProjectLedger.styles.ts`, `index.ts`), `components/Contact/Contact.tsx` (+ `index.ts`)
- Modify: `src/App.tsx` (ThemeProvider + LazyMotion + HomePage + skip link), `src/main.tsx`

**Layout contract (Home.styles.ts, `homeStyles as const`):**
- `shell`: `mx-auto grid max-w-[80rem] gap-x-[6rem] px-[1.5rem] lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:px-[3rem]`
- `panel`: `py-[3rem] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:py-[6rem]`
- `ledger`: `flex flex-col gap-[7rem] py-[3rem] lg:py-[6rem]`
- `sectionTitle`: `morph text-[2rem] leading-[1.1] tracking-[-0.01em] text-ink lg:text-[2.5rem]`
- `navLink(active)`: `group flex items-center gap-[0.75rem] text-[0.9375rem] text-muted hover:text-ink` + rule `h-px bg-line transition-[width,background-color] duration-300 w-[2rem] group-hover:w-[4rem] group-hover:bg-ink` widened + `bg-ink w-[4rem] text-ink` when active.

**Sections (ids):** `now`, `stack`, `experience`, `projects`, `contact`. `StickyPanel` shows name (`text-[3rem] lg:text-[3.5rem] font-medium tracking-[-0.02em]` display), role, `profile.intro`, nav using `useScrollSpy`, email/GitHub/LinkedIn as text links, `ThemeToggle`. `ExperienceRail`: `<ol class="dim-siblings relative border-l border-line">` with a `.rail-line` absolutely positioned bar; each `<li>` is a `Reveal as="li"` with a dot colored `bg-area-{area}` via `areaDot(area)` in `.styles.ts`, year in `font-mono text-muted`, title, org, summary (`max-w-[62ch]`). `Metrics`: four `useCountUp` tiles in a `grid grid-cols-2 gap-[2rem]`, value in display size, `useInView` to trigger. `ProjectLedger`: `<ul class="dim-siblings divide-y divide-line">` rows `grid gap-[1rem] py-[1.5rem] md:grid-cols-[14rem_1fr_auto]`, title as link, description, `kind` in `font-mono text-[0.8125rem] text-muted`, tags in `text-area-{area}`. `Contact`: one paragraph with email + resume link + socials. `HomePage` renders `StickyPanel` + ledger: `Reveal`-wrapped sections with `MorphHeading` titles ("Now", "What I work with", "Where I've been", "Projects on GitHub", "Get in touch"), `StackGraph` under the "What I work with" heading with a legend row of the four areas (dot + label). `ProgressRail` fixed at right with the five sections. Skip link `<a href="#now" class="sr-only focus:not-sr-only ...">`.

- [ ] **Step 1: Failing tests** (`HomePage.test.tsx`, with `motion/react` mocked to plain elements): renders headings for all five sections and a `nav` with five links; renders one experience item per role and one project row per project; renders the theme toggle button; the hidden graph list is present; every `href` in the panel is non-empty.
- [ ] **Step 2: Implement** per the contract above; keep each component file under ~120 lines by extracting named sub-components/helpers rather than commenting.
- [ ] **Step 3: `npm run check` passes → commit** `Compose the home page: panel, graph, rail, metrics, ledger, contact`.

---

### Task 9: Visual verification and tuning

**Files:**
- Create: `scripts/verify-visual.py` (dev tool, uses the firefox-devtools-mcp checkout at `/var/home/slave/github/claude-code/firefox-mcp-plugin`); `public/resume.pdf` (copy of `/var/home/slave/ai/career/resumes/master/master.pdf`); delete `public/dsilveira_25.pdf`, unused `public/images/*` except `profile.jpeg` if used.

- [ ] **Step 1:** Write `scripts/verify-visual.py` modelled on the earlier `verify_portfolio.py`: start `npm run dev` in a subprocess, drive the MCP server over stdio, and capture `dist/verify/{desk,mob}-{light,dark}.png` full-page, plus reduced-motion via `emulate(reducedMotion="reduce")`, the console (errors + warnings), an in-page CLS measurement (`new PerformanceObserver` on `layout-shift`, summed after 3 s), and an axe-core pass (`npm i -D axe-core`, inject `node_modules/axe-core/axe.min.js` via `evaluate_script` and run `axe.run()`, print violations). Screenshot capture waits 400 ms after theme toggles (body background transitions).
- [ ] **Step 2:** Run it; read every screenshot; fix spacing, contrast (all text ≥ 4.5:1 on both themes — axe checks it), overflow, graph density/legibility (labels not colliding: reduce nodes or link distance), and the sticky panel at 1024–1280 px widths. Iterate until: 0 console errors/warnings, 0 axe violations, CLS 0, both themes at 1440 and 390 look right.
- [ ] **Step 3:** `npm run build`; confirm gzip total of entry JS ≤ 150 kB and that `motion` and `d3-force` are in separate lazy chunks (grep `dist/assets`). Commit `Verify visually; tune spacing, contrast and graph density`.

---

### Task 10: Review, docs, cleanup

- [ ] **Step 1:** README rewrite: what the site is, `npm run dev|build|preview|test|check`, the token/units/motion rules in five bullets pointing at the spec, deploy note (Vercel auto-detects Vite; output `dist/`).
- [ ] **Step 2:** Dispatch a code-review subagent (superpowers:requesting-code-review template) over `redesign` since `076187d`; fix Critical/Important findings; re-run `npm run check` and `scripts/verify-visual.py`.
- [ ] **Step 3:** Final commit `Document the rebuilt portfolio`; leave the branch unmerged for the owner to open the PR (no attribution lines, per repo rule).
