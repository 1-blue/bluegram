import styled from "styled-components";

export const Wrapper = styled.ul`
  display: flex;

  & > li {
    margin-left: 1rem;
    cursor: pointer;
  }
  & > li:first-child {
    margin-left: 0rem;
  }
`;
