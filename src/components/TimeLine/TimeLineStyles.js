import styled from "styled-components";

export const Rail = styled.ol`
  border-left: 1px solid ${(props) => props.theme.colors.line};
  margin-left: 0.4rem;
`;

export const Entry = styled.li`
  position: relative;
  padding: 0 0 3.6rem 3.2rem;

  &::before {
    content: "";
    position: absolute;
    left: -0.45rem;
    top: 0.7rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: ${(props) => (props.current ? props.theme.colors.accent : props.theme.colors.muted)};
  }

  &:last-child {
    padding-bottom: 0.8rem;
  }
`;

export const Year = styled.span`
  font-family: ${(props) => props.theme.fonts.display};
  font-size: 1.9rem;
  color: ${(props) => props.theme.colors.accent};
  margin-right: 1.2rem;
`;

export const EntryTitle = styled.h3`
  display: inline;
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.ink};
`;

export const EntryText = styled.p`
  max-width: 68ch;
  margin-top: 0.8rem;
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.muted};
`;
