import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import { IconLink } from "../Header/HeaderStyles";
import { ContactLine, FooterInner, FooterLinks, FooterWrapper } from "./FooterStyles";

const Footer = () => (
  <FooterWrapper id="footer">
    <FooterInner>
      <ContactLine>
        Want to talk? <a href="mailto:dav.silveira@proton.me">dav.silveira@proton.me</a>
        {" or grab the "}
        <a href="/dsilveira_25.pdf" target="_blank" rel="noreferrer">
          resume
        </a>
        .
      </ContactLine>
      <FooterLinks>
        <IconLink href="https://github.com/daviewave" aria-label="GitHub">
          <AiFillGithub size="2.4rem" />
        </IconLink>
        <IconLink
          href="https://www.linkedin.com/in/david-silveira-03921821b/"
          aria-label="LinkedIn"
        >
          <AiFillLinkedin size="2.4rem" />
        </IconLink>
      </FooterLinks>
    </FooterInner>
  </FooterWrapper>
);

export default Footer;
