import styled, { css } from "styled-components";

export const Wrapper = styled.i`
  cursor: pointer;

  ${({ hoverfill }) =>
    hoverfill &&
    css`
      & > svg:hover {
        fill: ${({ hoverfill }) => hoverfill};
      }
    `}

  ${({ animation }) =>
    animation &&
    css`
      & > svg {
        animation-name: ${({ animation }) => animation};
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
      }
    `}
`;
