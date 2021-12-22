import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ button }) =>
    button &&
    css`
      &,
      &:after {
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
      }
      & {
        font-size: 10px;
        position: absolute;
        top: 5px;
        left: 5px;
        text-indent: -9999em;
        border-top: 5px solid rgba(255, 255, 255, 0.2);
        border-right: 5px solid rgba(255, 255, 255, 0.2);
        border-bottom: 5px solid rgba(255, 255, 255, 0.2);
        border-left: 5px solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.1s infinite linear;
        animation: load8 1.1s infinite linear;
      }
      @-webkit-keyframes load8 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes load8 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
    `}
`;
