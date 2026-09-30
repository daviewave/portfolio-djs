import React from "react";

import { skills } from "../../constants/constants";
import { Section, SectionDivider, SectionText, SectionTitle } from "../../styles/GlobalComponents";
import { SkillArea, SkillItems, SkillRow, SkillRows } from "./TechnologiesStyles";

const Technologies = () => (
  <>
    <SectionDivider />
    <Section id="tech">
      <SectionTitle>What I work with</SectionTitle>
      <SectionText>
        The tools I reach for most, grouped by the part of the stack they live
        in. The list changes as the work does.
      </SectionText>
      <SkillRows>
        {skills.map(({ area, items }) => (
          <SkillRow key={area}>
            <SkillArea>{area}</SkillArea>
            <SkillItems>{items.join(", ")}</SkillItems>
          </SkillRow>
        ))}
      </SkillRows>
    </Section>
  </>
);

export default Technologies;
