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
export const SlideScale = keyframes`
  0% {
    transform: translateY(-100vh) scale(0.1);
  
  }
  100% {
    transform: translateY(0) scale(1);
  }
`;

export const SideScroll = keyframes`
  0% {
    transform: translate(20px, 80px) scale(0.1);
  }
  100% {
    transform: translateY(0px, 0px) scale(1);
  }
`;
export const SideSearch = keyframes`
  0% {
    transform: translate(80px, 20px) scale(0.1);
  }
  100% {
    transform: translateY(0px, 0px) scale(1);
  }
`;

export const Bounce = keyframes`
  0% {
    transform: translateY(0px)
  }
  50% {
    transform: translateY(40px);
  }
  100% {
    transform: translateY(0px)
  }
`;
