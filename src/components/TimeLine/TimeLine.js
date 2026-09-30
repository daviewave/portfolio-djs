import React from "react";

import { TimeLineData } from "../../constants/constants";
import { Section, SectionDivider, SectionTitle } from "../../styles/GlobalComponents";
import { Entry, EntryText, EntryTitle, Rail, Year } from "./TimeLineStyles";

const Timeline = () => (
  <>
    <SectionDivider />
    <Section id="experience">
      <SectionTitle>Where I&apos;ve been</SectionTitle>
      <Rail>
        {TimeLineData.map((item, index) => (
          <Entry key={item.year} current={index === TimeLineData.length - 1}>
            <Year>{item.year}</Year>
            <EntryTitle>{item.title}</EntryTitle>
            <EntryText>{item.text}</EntryText>
          </Entry>
        ))}
      </Rail>
    </Section>
  </>
);

export default Timeline;
