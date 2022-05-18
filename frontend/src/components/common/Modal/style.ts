import styled, { css } from "styled-components";

export const Wrapper = styled.aside<{ primary?: boolean }>`
  z-index: 10;

  ${({ primary }) =>
    primary &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;
