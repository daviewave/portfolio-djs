import React from 'react';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList, Img } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { currentProjects } from "../../constants/constants";

const openInNewTab = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    console.log('URL is undefined or empty');
  }
};



const Projects = () => (
  <Section nopadding id="projects">
    <SectionDivider />
    <SectionTitle main>Projects</SectionTitle>
    <GridContainer>
      {/* by putting the parameter in curly braces we are 'destructuring' our
      project objects so we can then just call them as they are in the code */}
      {currentProjects.map(
        ({ id, image, title, description, tags, source, visit }) => (
          <BlogCard key={id}
            onClick={() => openInNewTab(visit)}
          >
            <Img src={image} />
            <TitleContent>
              <HeaderThree title>{title}</HeaderThree>
            </TitleContent>
            <CardInfo>{description}</CardInfo>
            <div>
              <TitleContent>Stack</TitleContent>
              <TagList>
                {tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </TagList>
            </div>
            {/* <UtilityList>
              <ExternalLinks href={visit}>Code</ExternalLinks>

              <ExternalLinks href={source}>Deploy</ExternalLinks>
            </UtilityList> */}
          </BlogCard>
        )
      )}
    </GridContainer>
  </Section>
);


export default Projects;