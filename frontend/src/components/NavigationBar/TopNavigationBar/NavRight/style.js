import styled from "styled-components";

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  align-items: baseline;

  & .nav-link {
    margin-left: 1.5em;
    cursor: pointer;
    font-weight: bold;
  }
  & .nav-link:first-child {
    margin-left: 0em;
  }
  & .nav-link:nth-last-child(2) {
    margin-right: 1.5em;
  }
`;
