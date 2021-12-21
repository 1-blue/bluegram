import styled from "styled-components";

export const Wrapper = styled.ul`
  display: flex;
  align-items: baseline;

  & > li:last-child {
    position: relative;
  }

  & > li {
    margin-left: 1.5rem;
    cursor: pointer;
    height: 24px;
  }
  & > li:first-child {
    margin-left: 0rem;
  }
`;
