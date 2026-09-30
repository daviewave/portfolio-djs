// One token set, two palettes. The real values live as CSS custom properties
// (set in globals.js and switched by the data-theme attribute on <html>), so
// styled-components read stable var() references and theme flips never
// re-render styles or flash on load.
export default {
  fonts: {
    display: "'Newsreader', Georgia, serif",
    main: "'Inter', -apple-system, sans-serif",
  },
  colors: {
    canvas: "var(--canvas)",
    raised: "var(--raised)",
    ink: "var(--ink)",
    muted: "var(--muted)",
    line: "var(--line)",
    accent: "var(--accent)",
    accentInk: "var(--accent-ink)",
  },
  breakpoints: {
    sm: "screen and (max-width: 640px)",
    md: "screen and (max-width: 828px)",
    lg: "screen and (max-width: 1024px)",
    xl: "screen and (max-width: 1400px)",
  },
};

export const palettes = `
  :root, [data-theme="dark"] {
    --canvas: #101418;
    --raised: #171d24;
    --ink: #e8edf2;
    --muted: #94a3b1;
    --line: #232b33;
    --accent: #d9a441;
    --accent-ink: #101418;
    color-scheme: dark;
  }
  [data-theme="light"] {
    --canvas: #fafaf7;
    --raised: #ffffff;
    --ink: #1a2129;
    --muted: #5a6672;
    --line: #e3e1da;
    --accent: #8a5a12;
    --accent-ink: #fafaf7;
    color-scheme: light;
  }
`;
