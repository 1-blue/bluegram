import styled, { css } from "styled-components";

export const Wrapper = styled.img`
  border-radius: 100%;

  ${({ $cursor }) =>
    $cursor &&
    css`
      cursor: pointer;
    `}
`;
