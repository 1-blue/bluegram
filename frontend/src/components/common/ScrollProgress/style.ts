import styled, { css } from "styled-components";

export const Wrapper = styled.aside<{ currentPositionY: number }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 5px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.color.blue},
    ${({ theme }) => theme.color.main}
  );
  box-shadow: 0 0 5px black;
  margin: 0;

  ${({ currentPositionY }) => css`
    width: ${currentPositionY * 100}%;
  `}
`;
