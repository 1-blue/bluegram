import styled, { css } from "styled-components";

export const Wrapper = styled.img`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: 100%;

  ${({ $cursor }) =>
    $cursor &&
    css`
      cursor: pointer;
    `}
`;
