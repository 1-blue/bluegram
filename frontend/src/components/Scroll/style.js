import styled, { css } from "styled-components";

export const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 3px;
  background: white;
  box-shadow: 0 0 5px black;
  margin: 0;

  ${({ currentPositionY }) => css`
    width: ${currentPositionY * 100}%;
  `}

  @media (min-width: 1024px) {
    background: black;
  }
`;
