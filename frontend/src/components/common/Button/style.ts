import styled, { css } from "styled-components";

export const Wrapper = styled.button<{ primary?: boolean }>`
  ${({ primary }) =>
    primary &&
    css`
      width: 100%;
      font-size: 1rem;
      font-weight: bold;
      background-color: ${({ theme }) => theme.color.main};
      opacity: 0.9;
      color: white;
      padding: 8px;
      border-radius: 4px;

      &:hover {
        opacity: 1;
      }
      @media (max-width: 768px) {
        font-size: 0.6rem;
      }
    `}
`;
