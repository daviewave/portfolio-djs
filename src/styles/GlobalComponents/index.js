import styled from "styled-components";

export const Section = styled.section`
  max-width: 1080px;
  margin: 0 auto;
  padding: ${(props) => (props.hero ? "9.6rem 2.4rem 4.8rem" : "6.4rem 2.4rem")};

  @media ${(props) => props.theme.breakpoints.md} {
    padding: ${(props) => (props.hero ? "6.4rem 2rem 3.2rem" : "4.8rem 2rem")};
  }
`;

export const SectionTitle = styled.h2`
  font-size: 3.4rem;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-bottom: 2.8rem;
  color: ${(props) => props.theme.colors.ink};

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 2.8rem;
  }
`;

export const SectionText = styled.p`
  max-width: 62ch;
  font-size: 1.7rem;
  color: ${(props) => props.theme.colors.muted};
  margin-bottom: 2.4rem;
`;

export const SectionDivider = styled.hr`
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.line};
  max-width: 1080px;
  margin: 0 auto;
`;
