import React from 'react';
import { DiCloud9, DiDatabase, DiReact } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
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
    <br />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      As a full stack developer I have experience with a wide range of technologies spanning across the front-end, back-end, dev-ops, and artificial intelligence fields.
    </SectionText>
    <List>
      <ListItem>
        {/* <DiReact size="3rem" /> */}
        <ListContainer>
          <ListTitle>Front-End</ListTitle>
          <ListParagraph>
            - NextJS <br />
            - ReactJS <br />
            - MaterialUI <br />
            - Typescript <br />
            - Javascript <br />
            - Figma + Balsamiq <br />
            - CSS <br />
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        {/* <DiDatabase size="3rem" /> */}
        <ListContainer>
          <ListTitle>Back-End</ListTitle>
          <ListParagraph>
            - Django <br />
            - Node.js <br />
            - Python <br />
            - REST API <br />
            - Mongo <br />
            - Flask <br />
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        {/* <DiCloud9 size="3rem" /> */}
        <ListContainer>
          <ListTitle>Devops</ListTitle>
          <ListParagraph>
            - AWS <br />
            - Docker <br />
            - Linux <br />
            - Nginx <br />
            - Ubuntu <br />
            - Git <br />
            - Scripting <br />
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        {/* <DiCloud9 size="3rem" /> */}
        <ListContainer>
          <ListTitle>A.I</ListTitle>
          <ListParagraph>
            - PyTorch <br />
            - PyTensor <br />
            - Whispr <br />
            - Llama<br /> 
            - GPT<br />
            - PyTorch<br /> 
            - Kaldi<br />
          </ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
