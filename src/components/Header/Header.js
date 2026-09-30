import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";

import { useThemeToggle } from "../../styles/theme";
import { Bar, IconLink, Inner, NavLink, ToggleButton, Wordmark } from "./HeaderStyles";

const Header = () => {
  const { mode, toggle } = useThemeToggle();
  return (
    <Bar>
      <Inner>
        <Wordmark href="/">David Silveira</Wordmark>
        <NavLink href="#experience">Experience</NavLink>
        <NavLink href="#tech">Skills</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#footer">Contact</NavLink>
        <IconLink href="https://github.com/daviewave" aria-label="GitHub">
          <AiFillGithub size="2.2rem" />
        </IconLink>
        <IconLink
          href="https://www.linkedin.com/in/david-silveira-03921821b/"
          aria-label="LinkedIn"
        >
          <AiFillLinkedin size="2.2rem" />
        </IconLink>
        <ToggleButton
          onClick={toggle}
          aria-label={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {mode === "dark" ? <FiSun size="1.7rem" /> : <FiMoon size="1.7rem" />}
        </ToggleButton>
      </Inner>
    </Bar>
  );
};

export default Header;
