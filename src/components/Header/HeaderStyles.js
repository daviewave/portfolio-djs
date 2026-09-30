import styled from "styled-components";

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, ${(props) => props.theme.colors.canvas} 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${(props) => props.theme.colors.line};
`;

export const Inner = styled.nav`
  max-width: 1080px;
  margin: 0 auto;
  padding: 1.4rem 2.4rem;
  display: flex;
  align-items: center;
  gap: 2.8rem;
`;

export const Wordmark = styled.a`
  font-family: ${(props) => props.theme.fonts.display};
  font-size: 2rem;
  font-style: italic;
  color: ${(props) => props.theme.colors.ink};
  margin-right: auto;
`;

export const NavLink = styled.a`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.muted};
  transition: color 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.ink};
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    display: none;
  }
`;

export const IconLink = styled.a`
  display: inline-flex;
  color: ${(props) => props.theme.colors.muted};
  transition: color 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.ink};
  }
`;

export const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.line};
  background: transparent;
  color: ${(props) => props.theme.colors.ink};
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.muted};
  }
`;
