import { keyframes } from "styled-components";

export const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const SpinY = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(360deg)
  }
`;
