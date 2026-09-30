import styled from "styled-components";

export const FooterWrapper = styled.footer`
  border-top: 1px solid ${(props) => props.theme.colors.line};
`;

export const FooterInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 4rem 2.4rem 4.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;
  align-items: baseline;
  justify-content: space-between;
`;

export const ContactLine = styled.p`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.muted};

  a {
    color: ${(props) => props.theme.colors.ink};
    transition: color 0.15s ease;
  }
  a:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
