import styled from "styled-components";

export const Wrapper = styled.nav`
  padding: 1em;
  margin-bottom: 2em;
  background-color: white;
  box-shadow: 0 0 10px gray;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1024px) and (max-width: 1600px) {
    max-width: 60vw;
    margin: auto;
  }
  @media (min-width: 1600px) {
    max-width: 60vw;
    margin: auto;
  }
`;
