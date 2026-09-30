# Portfolio rebuild — design

Approved 2026-09-29. Replaces the Next.js + styled-components site in place.

## Brief

A ground-up rebuild of davidsilveira's portfolio: a new visual identity informed by
ten distinctive live developer portfolios, "passively interactive" (the page responds
to scroll and cursor without demanding clicks), on Vite + React 19 + TypeScript +
Tailwind v4, refactored to the Wolverine coding conventions, hosted on Vercel. The
resume-synced copy from the previous pass carries over; the presentation is new.

Research inputs (scratchpad `research/portfolios.md`, `research/interaction-tech.md`):
sites that felt alive without feeling templated had exactly one ambient system,
motion that finishes rather than loops, motion coupled to reading, and reduced-motion
gating; the clichés to avoid are particle/constellation backgrounds, gradient heroes,
typing headlines, eyebrow labels, bento grids, smooth-scroll + custom-cursor stacks.

## Identity

**Typography.** One variable family, Recursive (self-hosted via Fontsource). Its
`MONO` and `CASL` axes let a heading morph from mono to sans as it enters view — the
"code becomes product" motif. Body text is the linear sans; timestamps, tags and graph
labels are the mono cut. Display sizes are large with tight leading; sentence case
everywhere; no eyebrow labels; no `→` on links.

**Color.** Cool graphite dark (`canvas #121417`, `ink #E6E8EB`) and cool light
(`canvas #F3F4F6`, `ink #16181D`), each with `raised`, `muted` and `line` tokens.
The only chromatic color is a muted quartet mapped to the four skill areas —
backend, frontend, AI & data, infrastructure — used identically for graph nodes,
timeline dots and project tags. No gradients, no glow, no brand accent.

**Layout.** At `>= 64rem`: a sticky left panel (name, one-line role, three-sentence
intro, scroll-spy nav whose active rule lengthens, contact links, theme toggle) and a
scrolling right column. Below `64rem`: one stacked column, panel first. No cards;
hairlines only between list rows.

## The one ambient system: the stack graph

A `<canvas>` at the top of the right column (about 55vh, scrolls away) shows ~30
labeled nodes — real technologies from the resume — colored by area, sized by
prominence, with edges from shared area and from real co-use. Implemented with
d3-force stepped manually in the app's single rAF loop:

- Settles within ~3 s (alpha decays to rest), then only reacts to the cursor: nodes
  within a radius lift toward the pointer, their edges brighten, the nearest label
  sharpens. `pointerleave` returns to rest.
- On `(pointer: coarse)` or `(hover: none)`: static after settle.
- Under `prefers-reduced-motion: reduce`: ticks to rest before first paint and renders
  one still frame; hover-highlight only.
- Paused when off-screen or `document.hidden`; scaled by `devicePixelRatio`.
- Accessible: `role="img"` with an `aria-label`, plus a visually-hidden list of the
  same nodes grouped by area.
- Lazy-loaded after first paint so it never competes with LCP.

## Motion coupled to reading

| Behavior | Trigger | Tier |
| --- | --- | --- |
| Experience rail line grows; dots ignite as entries enter view; entries reveal once | scroll / in-view | 1 with 2 fallback |
| Metrics count up once (5 years, 20 contributors, 117 Makefile targets, 3.6x speedup) | first in-view | 2 |
| Hover dims sibling rows in experience and project lists | hover | 1 (`:has()`) |
| Scroll-spy highlights the current section; a thin right-edge progress rail doubles as nav | scroll | 2 |
| Theme toggle is a View-Transitions circular wipe from the button | click | 2, instant fallback |
| Heading morph mono→sans, once | in-view | 1 with 2 fallback |

Three tiers behind one gate, `useMotionPreference()` (reduced-motion media query with
a change listener, plus pointer capability):

1. **CSS only.** Tailwind `motion-safe:` utilities and `animation-timeline: view()/scroll()`
   inside `@supports`; the un-animated state is the final layout.
2. **Motion (`motion/react`)**, loaded lazily via `LazyMotion` + `domAnimation`
   (~20 kB): `whileInView` reveals, `useScroll`/`useTransform` for the rail and
   progress, `useInView` for counters, `<MotionConfig reducedMotion="user">`. This is
   the reliable path because Firefox stable does not yet ship CSS scroll timelines.
3. **The canvas graph**, above.

Rules: animate only `transform`, `opacity` and CSS custom properties; one rAF
scheduler and one passive `pointermove` store shared by everything; no smooth-scroll
library, no custom cursor, no preloader.

## Content and information architecture

Copy is the resume-synced text from the previous pass, reorganized:

1. **Now** — intro and what is being built (Wolverine at Cyberhill).
2. **Stack** — the graph plus a compact legend row of the four areas.
3. **Experience** — the rail, newest first (2026 → 2020).
4. **Projects** — ledger rows: title, one-sentence description, a type label
   ("tooling · Bash" style, sentence case), area-colored tags, code link.
5. **Contact** — email, resume PDF (`public/resume.pdf`, the current master), GitHub, LinkedIn.

Out of scope: an "Ask my resume" AI widget (needs a backend), GitHub star counts
(needs a build-time API), a contact form.

## Architecture

```
src/
  main.tsx  App.tsx
  index.css              @import "tailwindcss"; @custom-variant dark; palettes on
                         :root/[data-theme=dark]; @theme inline maps tokens to vars;
                         --color-*: initial so no raw palette class exists
  pages/Home/            HomePage.tsx  Home.types.ts  Home.styles.ts
    components/          StickyPanel/ StackGraph/ ExperienceRail/ Metrics/
                         ProjectLedger/ Contact/  (each: X.tsx, X.types.ts, index.ts,
                         X.styles.ts only above three constants)
    hooks/               useScrollSpy.ts, useCountUp.ts
  components/            ThemeToggle/ Reveal/ ProgressRail/ VisuallyHidden/  + index.ts
  lib/motion/            scheduler.ts (one rAF), pointer.ts, useMotionPreference.ts
  lib/graph/             build.ts (nodes/edges from content), forces.ts, layout.ts — pure, no React
  lib/theme/             init.ts (pre-hydration script source), transition.ts (wipe)
  lib/utils.ts           cn()
  content/               profile.ts, experience.ts, skills.ts, projects.ts (typed)
  test/                  setup.ts (IntersectionObserver/ResizeObserver/matchMedia stubs), render.tsx
```

Tooling: Vite 8 (`server.port: 3000`), `@vitejs/plugin-react`, TypeScript strict,
Tailwind v4 via `@tailwindcss/vite`, Biome (tabs, double quotes, organized imports,
`css.parser.tailwindDirectives: true`), Vitest 5 + Testing Library on jsdom, Recursive
from `@fontsource-variable/recursive` (latin subset, preloaded, `font-display: swap`
with a size-adjusted fallback). Fallback display face if the Recursive subset with both
axes exceeds ~120 kB: Roboto Flex (width-axis morph).

## Conventions applied

From the Wolverine conventions: Comments and Sub-functions-over-comments (small named
functions, no narration); React and TypeScript (token classes only, never a raw
palette class or hex in components; `rem` never `px`; literal Tailwind class strings;
`const fn = () =>` except component signatures; typed contexts whose hooks throw
outside their provider; `<button type="button">`; real labels; effect cleanup; one
`index.ts` barrel per `components/` directory, none re-exporting a lazy module);
frontend layout and code style (domain-named directories, `.types.ts`/`.styles.ts`,
`<thing>Styles as const`, Biome, `.tsx` only for JSX).

Recorded as not applicable: `@cyberhill/design-system` (private; the token layer here
enforces the same rule), TanStack Query (no server state), YAML-over-JSON (Vite reads
TS content natively; the only JSON files are the JSON-only tools' own), everything
Django, devops and CI.

## Quality bar

- Lighthouse ≥ 95 on performance, accessibility, best practices, SEO; CLS 0.
- Initial JS ≤ 150 kB gzipped; graph and Motion arrive after first paint.
- Zero console errors or warnings in dev and prod.
- Keyboard: visible focus everywhere; theme toggle and nav operable; skip link.
- Both themes at 1440 and 390 px verified visually, plus reduced-motion mode.

## Testing and verification

Vitest: `lib/graph` layout and edge-building (pure), theme init and toggle, scroll-spy
hook, `Reveal` under reduced motion renders final state immediately, content modules
satisfy their types and have no empty fields. Visual: firefox-devtools-mcp driven in
one sandbox process with the Vite dev server (screenshots both themes × two widths,
console, reduced-motion emulation), then Lighthouse against `vite preview`.

## Delivery

Work happens on the `redesign` branch. The Next.js app, styled-components and
`yarn.lock` are removed; `package-lock.json` is the lockfile. Vercel needs no config
file. The resume PDF is refreshed from `resumes/master/master.pdf`.
