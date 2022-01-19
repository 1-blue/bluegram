import styled, { css } from "styled-components";

export const Wrapper = styled.span`
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;

  ${({ $postEnd }) =>
    $postEnd &&
    css`
      font-size: 1.2rem;
      margin: 6vh 0;
    `}
`;
