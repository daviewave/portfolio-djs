import React from "react";

import { currentProjects } from "../../constants/constants";
import { Section, SectionDivider, SectionText, SectionTitle } from "../../styles/GlobalComponents";
import {
  CodeLink,
  Ledger,
  ProjectBody,
  ProjectDescription,
  ProjectTags,
  ProjectTitle,
  Row,
} from "./ProjectsStyles";

const Projects = () => (
  <>
    <SectionDivider />
    <Section id="projects">
      <SectionTitle>Projects on GitHub</SectionTitle>
      <SectionText>
        Most of my professional work lives in private repos, so this is the
        public slice: side projects, tooling, and practice.
      </SectionText>
      <Ledger>
        {currentProjects.map(({ id, title, description, tags, source }) => (
          <Row key={id}>
            <ProjectTitle>
              <a href={source} target="_blank" rel="noreferrer">
                {title}
              </a>
            </ProjectTitle>
            <ProjectBody>
              <ProjectDescription>{description}</ProjectDescription>
              <ProjectTags>{tags.join(", ")}</ProjectTags>
            </ProjectBody>
            <CodeLink href={source} target="_blank" rel="noreferrer">
              View code
            </CodeLink>
          </Row>
        ))}
      </Ledger>
    </Section>
  </>
);

export default Projects;
