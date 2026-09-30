import styled from "styled-components";

export const SkillRows = styled.dl`
  border-top: 1px solid ${(props) => props.theme.colors.line};
`;

export const SkillRow = styled.div`
  display: grid;
  grid-template-columns: 18rem 1fr;
  gap: 2.4rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.line};

  @media ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;

export const SkillArea = styled.dt`
  font-family: ${(props) => props.theme.fonts.display};
  font-size: 1.9rem;
  color: ${(props) => props.theme.colors.ink};
`;

export const SkillItems = styled.dd`
  margin: 0;
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.muted};
`;
