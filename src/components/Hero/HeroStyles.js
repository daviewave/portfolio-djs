import styled, { keyframes } from "styled-components";

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 4.8rem;
  align-items: center;

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: 1fr;
  }
`;

export const Kicker = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};
  margin-bottom: 1.6rem;
`;

export const Headline = styled.h1`
  font-size: 5.6rem;
  line-height: 1.08;
  letter-spacing: -0.015em;
  margin-bottom: 2.4rem;
  max-width: 16ch;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 4rem;
  }
`;

export const Intro = styled.p`
  max-width: 56ch;
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.muted};
  margin-bottom: 3.2rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const draw = keyframes`
  from { stroke-dashoffset: 240; }
  to { stroke-dashoffset: 0; }
`;

const appear = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Graph = styled.svg`
  width: 100%;
  height: auto;
  display: block;

  @media ${(props) => props.theme.breakpoints.md} {
    display: none;
  }

  .edge {
    stroke: ${(props) => props.theme.colors.line};
    stroke-width: 1;
    stroke-dasharray: 240;
    animation: ${draw} 1.4s ease-out forwards;
  }
  .node {
    fill: ${(props) => props.theme.colors.muted};
    opacity: 0;
    animation: ${appear} 0.5s ease-out 0.9s forwards;
  }
  .node--accent {
    fill: ${(props) => props.theme.colors.accent};
  }
`;
