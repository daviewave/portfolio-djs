import styled, { css } from "styled-components";

const solid = css`
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.accentInk};
  border: 1px solid transparent;

  &:hover {
    filter: brightness(1.08);
  }
`;

const quiet = css`
  background: transparent;
  color: ${(props) => props.theme.colors.ink};
  border: 1px solid ${(props) => props.theme.colors.line};

  &:hover {
    border-color: ${(props) => props.theme.colors.muted};
  }
`;

const Button = styled.a`
  display: inline-block;
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.15s ease, filter 0.15s ease;
  ${(props) => (props.quiet ? quiet : solid)}
`;

export default Button;
