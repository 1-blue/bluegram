import styled from "styled-components";

export const Wrapper = styled.ul`
  max-width: 486px;
  margin: auto;
  margin-top: 2vh;
  margin-bottom: 5vh;
  box-shadow: 5px 5px 20px black;
  border-radius: 0.4em;

  @media (max-width: 486px) {
    margin: 0;
    box-shadow: 0 0 0;
  }

  & .post-card-comment-wrapper:nth-last-of-type(1) {
    margin-bottom: 0;
  }
`;
