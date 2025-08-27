import React from "react";

import {
  ButtonSection,
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection } from "./HeroStyles";

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        David Silveira <br />
        Full Stack Software Engineer
      </SectionTitle>
      <SectionText>
        I’m a nerd with a passion for technology, and when I’m not coding, I’m
        usually diving into everyone’s favorites like cybersecurity, space, or
        the current hottest legal cases. With a background in Neuroscience and
        Computer Science, I’ve got a knack for understanding how users think,
        which helps me find creative ways to make tech not just functional, but
        enjoyable. Python is usually involved in whatever I’m building, and I’ve
        become a bit of a loonix (linux) nut — constantly experimenting with
        different operating systems on what has come to be my favorite — Qubes
        OS, which allows me to get a little taste of everything using virtual
        machines. With my love for building, I aim to create tech that’s secure,
        intuitive, and adds real value to society.
      </SectionText>
      <ButtonSection>
        <Button onClick={() => (window.location = "#footer")}>About Me</Button>
        <Button onClick={() => (window.location = "#footer")}>
          Tech Skills
        </Button>
        <Button onClick={() => (window.location = "#footer")}>
          Github Projects
        </Button>
        <Button onClick={() => (window.location = "#footer")}>
          Contact Info
        </Button>
      </ButtonSection>
    </LeftSection>
  </Section>
);

export default Hero;
