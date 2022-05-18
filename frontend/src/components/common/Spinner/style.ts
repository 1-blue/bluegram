import styled from "styled-components";
import { Spin, SpinY } from "@src/styles/animation";

export const ButtonSpinner = styled.aside`
  width: 20px;
  height: 20px;
  margin: auto;
  font-size: 10px;
  border: 5px solid white;
  border-top: 5px solid rgba(255, 255, 255, 0.4);
  border-radius: 100%;
  animation: ${Spin} 1s infinite linear;
  background-color: transparent;
`;

export const PageSpinner = styled.aside`
  /* fixed bg-black/60 top-0 left-0 w-full h-full z-20 flex justify-center items-center animate-fade-in */

  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    animation: ${SpinY} 1s infinite linear;
  }
`;
