import styled from "styled-components";

export const Img = styled.img`
  width: 100%;
  height: 40%;
  max-height: 25vh;
  object-fit: cover;
  overflow: hidden;
  background-color: white;
  border-radius: 10px 10px 0 0;
`;

export const GridContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding: 3rem;
  place-items: center;
  column-gap: 2rem;
  row-gap: 3rem;
  width: 92vw;
  max-width: 1280px;
  // min-height:

  @media ${(props) => props.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    padding-bottom: 0;
  }
`;
export const BlogCard = styled.div`
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(80, 78, 78, 0.5);

  display: flex;
  flex-direction: column;
  // justify-content: space-around;

  width: 28vw;
  height: fits-content;
  height: 64vh;
  padding-bottom: 4px;

  @media ${(props) => props.theme.breakpoints.lg} {
    width: 40vw;
    height: 60vh;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 65vw;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80vw;
    // height: 75vh;
  }

  &:hover {
    cursor: pointer;
    opacity: 75%;
  }
`;
export const TitleContent = styled.div`
  text-align: center;
  z-index: 20;
  width: 100%;
  font-size: 1.2em;
  // margin: auto;
  // padding-top: 12px;
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 1.2em;
  }
`;

export const HeaderThree = styled.h3`
  font-weight: 500;
  letter-spacing: 2px;
  color: #9cc9e3;
  // padding: 0.5rem 0;
  font-size: ${(props) => (props.title ? "3rem" : "2rem")};
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 1.2em;
  }
`;

export const Hr = styled.hr`
  width: 50px;
  height: 3px;
  margin: 20px auto;
  border: 0;
  background: #d0bb57;
`;

export const Intro = styled.div`
  width: 170px;
  margin: 0 auto;
  color: #dce3e7;
  font-family: "Droid Serif", serif;
  font-size: 13px;
  font-style: italic;
  // line-height: 18px;
`;

export const CardInfo = styled.p`
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  padding-bottom: 1rem;
  color: #e4e6e7;
  font-size: 1.1em;
  text-align: center;
  // margin-top: -4px;

  @media ${(props) => props.theme.breakpoints.lg} {
    font-size: 1em;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 0.9em;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 0.8em;
  }
`;

export const UtilityList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  margin: 2.5rem 0;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 0.3rem;
  }
`;

export const ExternalLinks = styled.a`
  color: #d4c0c0;
  font-size: 1.6rem;
  padding: 1rem 1.5rem;
  background: #6b3030;
  border-radius: 15px;
  transition: 0.5s;
  &:hover {
    background: #801414;
  }
`;

export const TagList = styled.ul`
  // height: 10%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  align-items: center;
  // padding: 1.8rem;
  // max-width: 80%;
  @media ${(props) => props.theme.breakpoints.sm} {
    // display: inline;
    // display: none;
    // grid-template-columns: 2fr 2fr;
  }
`;
export const Tag = styled.li`
  color: #d8bfbf;
  flex: 0 1 auto;
  font-size: 1.4rem;
  border-radius: 12px;
  border: 1px solid gray;
  padding: 0.5rem;
  // min-width: 12%;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 0.9rem;
    padding: 0.3rem;
  }
  background: ${({ alt }) =>
    alt
      ? "linear-gradient(180deg, #4a66e2ff 0%, #7a88d6ff 50%, #6fd2caff 100%)"
      : "linear-gradient(180deg, #324bbbff 0%, #5666c5ff 50%, #5850c5ff 100%)"};
`;
