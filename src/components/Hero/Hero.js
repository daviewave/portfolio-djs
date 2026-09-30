import React from "react";

import { Section } from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { Actions, Graph, Headline, HeroGrid, Intro, Kicker } from "./HeroStyles";

// A nod to the work: a small knowledge graph, hand-placed.
const NODES = [
  [150, 30], [60, 90], [230, 80], [110, 160], [200, 190], [40, 210], [260, 250],
];
const EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6],
];

const Hero = () => (
  <Section hero id="about">
    <HeroGrid>
      <div>
        <Kicker>Software engineer in Austin, Texas</Kicker>
        <Headline>
          I build AI products from first commit to production.
        </Headline>
        <Intro>
          Lead software engineer at Cyberhill Partners, where our team took
          Wolverine — a self-healing cybersecurity knowledge-graph platform —
          from proof of concept to AWS Marketplace. Five years across the
          stack: Django and React, graph databases, LLM pipelines, and the
          infrastructure underneath. Off hours I'm usually somewhere deep in
          Linux; Qubes OS is home.
        </Intro>
        <Actions>
          <Button href="mailto:dav.silveira@proton.me">Get in touch</Button>
          <Button quiet href="/dsilveira_25.pdf" target="_blank" rel="noreferrer">
            View resume
          </Button>
        </Actions>
      </div>
      <Graph viewBox="0 0 300 280" aria-hidden="true">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            className="edge"
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
        {NODES.map(([x, y], i) => (
          <circle
            key={i}
            className={i === 3 ? "node node--accent" : "node"}
            cx={x}
            cy={y}
            r={i === 3 ? 7 : 4.5}
          />
        ))}
      </Graph>
    </HeroGrid>
  </Section>
);

export default Hero;
