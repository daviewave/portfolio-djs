import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import { palettes } from "../themes/default";

const GlobalStyles = createGlobalStyle`
  ${normalize};
  ${palettes};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.7rem;
    line-height: 1.65;
    background: ${(props) => props.theme.colors.canvas};
    color: ${(props) => props.theme.colors.ink};
    transition: background 0.25s ease, color 0.25s ease;
  }
  h1, h2, h3 {
    font-family: ${(props) => props.theme.fonts.display};
    font-weight: 500;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  li {
    list-style: none;
  }
  :focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.accent};
    outline-offset: 3px;
    border-radius: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto;
    }
  }
`;

export default GlobalStyles;
