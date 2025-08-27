import styled from "styled-components";

export const ImageContainer = styled.div`
  text-align: center;
  background-image: radial-gradient(
    50% 50% at 50% 50%,
    rgba(79, 108, 176, 0.25) 53.8%,
    rgba(79, 108, 176, 0) 100%
  );
  width: 100%;
  padding: 60px;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${(props) => props.theme.breakpoints.lg} {
    background-image: none;
    padding: 0;
    margin-top: 40px;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    background-image: none;
    padding: 0;
    margin-top: 16px;
  }
`;

export const MainImage = styled.img`
  width: 100%;
`;

export const List = styled.ul`
  display: flex;
  justify-content: center: 
  align-items: center;
  width: 86vw;
  max-width: 1200px;
  gap: 8%;



  @media ${(props) => props.theme.breakpoints.lg} {
    max-width: 800px;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 2fr 2fr;
    width: 60vw;
    margin: auto;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 800px;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 2fr 2fr;
    width: 60vw;
    margin: auto;
    // gap: 4%;

  }

  @media ${(props) => props.theme.breakpoints.sm} {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-template-columns: 90vw;
    gap: 40px
    

  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;

  @media ${(props) => props.theme.breakpoints.sm} {
    // align-items: center;
  }
`;

export const ListTitle = styled.h4`
  font-weight: 700;
  font-size: 1.6em;
  letter-spacing: 0.02em;
  color: #ffffff;
  margin-bottom: 4px;
  li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    font-size: 2.2em;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 1.4em;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 2.2em;
  }
`;

export const ListParagraph = styled.ul`
  font-size: 1.3em;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  li::before {
    content: "•";
    color: white;
    margin-right: 0.75rem;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    font-size: 1.6em;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 1.2em;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    // font-size: 1.8em;
  }
`;

export const ListItem = styled.li`
  max-width: 320px;
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 203px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    margin-bottom: 14px;
    max-width: 320px;
    flex-direction: row;
  }
`;

export const ListIcon = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  margin-bottom: 10px;

  @media ${(props) => props.theme.breakpoints.md} {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 32px;
    height: 32px;
    margin-bottom: 0px;
  }
`;
