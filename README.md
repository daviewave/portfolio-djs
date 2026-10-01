# davidsilveira.dev

Personal portfolio: a single page built with Vite, React 19, TypeScript and
Tailwind v4. Typography carries the identity (Recursive, a variable font whose
headings morph from mono to sans as they enter view), and the motion is coupled to
reading: the experience rail draws itself as you scroll, metrics count up once,
hovering a row dims its siblings. The page is dark only; a soft light follows
the cursor, or on a phone rides the scroll and jumps to wherever you touch.

## Commands

```sh
npm install
npm run dev        # Vite on http://localhost:3000
npm run build      # tsc -b && vite build -> dist/
npm run preview    # serve dist/ on :3000
npm run test       # vitest
npm run check      # biome + tsc + vitest (run before every commit)
```

Visual verification (needs the firefox-devtools-mcp checkout the script points
at): `scripts/verify-visual.py` starts the dev server, drives Firefox, and writes
screenshots at desktop and phone widths plus console, CLS and
axe results to `.verify/`.

## How the code is organized

```
src/
  main.tsx  App.tsx  index.css   tokens as CSS variables; @theme inline maps them to utilities
  pages/Home/                    HomePage.tsx, Home.types.ts, Home.styles.ts, components/, hooks/
  components/                    shared UI: CursorLight, Reveal, MorphHeading, ProgressRail
  lib/motion/                    one rAF scheduler, one pointer store, useMotionPreference
  content/                       typed profile, skills, experience and projects (the resume, as data)
  test/                          jsdom setup and helpers
```

Rules the code follows (the design spec in `docs/superpowers/specs/` has the
reasoning):

- Token classes only (`bg-canvas`, `text-ink`, `text-area-ai`): the Tailwind
  palette is disabled with `--color-*: initial`, so a raw color class does not
  exist.
- Relative units only. Sizes are `rem`, lengths that track their container are
  `%`; there are no `px` values in components.
- Motion animates `transform`, `opacity` and custom properties, never layout;
  the un-animated state is the final layout. Everything hangs off
  `useMotionPreference()`, so `prefers-reduced-motion` gets the same content,
  still.
- One directory per unit: `X.tsx`, `X.types.ts`, `X.styles.ts` (only above three
  class constants), tests beside them, one `index.ts` barrel per `components/`
  directory. Barrels never re-export a lazily loaded module.
- Biome formats (tabs, double quotes) and lints; `.tsx` only where there is JSX.
- Bundle: Motion ships in the initial bundle because its `m` components are
  used above the fold.

## Deploying

`vercel.json` pins the Vite framework preset, `npm run build` and `dist/` so
the project's older Next.js settings on Vercel do not apply; `engines.node`
pins Node 22. The resume PDF lives at `public/resume.pdf`.
