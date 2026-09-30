import styled from "styled-components";

export const Ledger = styled.ul`
  border-top: 1px solid ${(props) => props.theme.colors.line};
`;

export const Row = styled.li`
  display: grid;
  grid-template-columns: 24rem 1fr auto;
  gap: 2.4rem;
  align-items: baseline;
  padding: 2.2rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.line};

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 2.2rem;

  a {
    transition: color 0.15s ease;
  }
  a:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

export const ProjectBody = styled.div``;

export const ProjectDescription = styled.p`
  max-width: 62ch;
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.muted};
  margin-bottom: 0.6rem;
`;

export const ProjectTags = styled.p`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.muted};
  opacity: 0.75;
`;

export const CodeLink = styled.a`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;
