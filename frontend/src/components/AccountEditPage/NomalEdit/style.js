import styled from "styled-components";

export const Wrapper = styled.section`
  /* 간단 자기 소개 */
  .about {
    width: 60%;
    padding: 0.5em;
    margin-bottom: 0.8em;
    border: 1px solid purple;
    font-size: 0.8rem;
    font-weight: 500;
    resize: none;
    font-family: inherit;

    &::placeholder {
      font-size: 0.6rem;
    }
  }
`;
