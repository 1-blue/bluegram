import styled, { css } from "styled-components";

export const Wrapper = styled.aside`
  position: fixed;
  top: 8%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  background-color: white;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  padding: 1em;
  border-radius: 0.4em;
  text-align: center;
  overflow: hidden;
  z-index: 100;

  & .toast-message {
    word-break: keep-all;
    white-space: pre-line;
  }

  transition: all 1s;
  animation-name: toast;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;

  ${({ $success, $warning, $error }) => {
    if ($success) {
      return css`
        background-color: var(--success-color);
      `;
    } else if ($warning) {
      return css`
        background-color: var(--warning-color);
      `;
    } else if ($error) {
      return css`
        background-color: var(--error-color);
      `;
    }
  }};
`;
