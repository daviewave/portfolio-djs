import React from "react";
import { DiCloud9, DiDatabase, DiReact } from "react-icons/di";
import {
  Section,
  SectionDivider,
  TechText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider />
    <SectionTitle>Technologies</SectionTitle>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        gap: "20px",
      }}
    >
      <TechText>
        Over the course of my career I’ve had the chance to work with a wide
        variety of technologies—experimenting, integrating, and building across
        frontend, backend, DevOps, and AI. While I’m always learning, the tools
        listed here are the ones I’ve grown most skilled with, including some of
        the more challenging and complex technologies I’ve learned and
        successfully integrated, which I’m especially proud of.
      </TechText>

      <List>
        <ListContainer>
          <ListTitle>Front-End</ListTitle>
          <ListParagraph>
            <li>NextJS</li>
            <li>ReactJS</li>
            <li>MaterialUI</li>
            <li>Typescript</li>
            <li>Javascript</li>
            <li>Figma</li>
            <li>Penpot</li>
            <li>Balsamiq</li>
            <li>CSS</li>
            <li>HTML</li>
          </ListParagraph>
        </ListContainer>

        <ListContainer>
          <ListTitle>Back-End</ListTitle>
          <ListParagraph>
            <li>Django</li>
            <li>Python</li>
            <li>REST API's</li>
            <li>Flask</li>
            <li>PostgreSQL</li>
            <li>Redis</li>
            <li>Celery</li>
            <li>WebSockets</li>
            <li>Async Programming</li>
            <li>Data Modeling</li>
          </ListParagraph>
        </ListContainer>

        <ListContainer>
          <ListTitle>Devops</ListTitle>
          <ListParagraph>
            <li>Shell Scripting</li>
            <li>Docker</li>
            <li>Linux</li>
            <li>Qubes OS</li>
            <li>Nginx Servers</li>
            <li>Digital Ocean</li>
            <li>On-Prem Deployments</li>
            <li>Virtual Machines</li>
            <li>Git</li>
            <li>Network/VPN Mgmt</li>
          </ListParagraph>
        </ListContainer>

        <ListContainer>
          <ListTitle style={{ paddingLeft: "4px" }}>AI</ListTitle>
          <ListParagraph>
            <li>GPT model</li>
            <li>Whispr model</li>
            <li>gpt4all</li>
            <li>HuggingFace Transformers</li>
            <li>Kaldi ASR Pipeline</li>
            <li>PyTorch/PyTensor</li>
            <li>LangChain</li>
            <li>Prompt Engineering</li>
            <li>Word2Vec</li>
            <li>Risk/Legal Analysis</li>
          </ListParagraph>
        </ListContainer>
      </List>
    </div>
  </Section>
);

export default Technologies;
