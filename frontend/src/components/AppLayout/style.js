import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--background-color);
  min-height: 100vh;
`;

export const MainContainer = styled.main`
  margin: auto 2%;
  padding-bottom: 10vh;
  @media (min-width: 1024px) {
    max-width: 60vw;
    margin: auto;
  }
`;
