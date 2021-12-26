import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ page }) =>
    page &&
    css`
      & {
        margin: 200px auto;
        font-size: 25px;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        position: relative;
        text-indent: -9999em;
        -webkit-animation: spinner-page 1.1s infinite ease;
        animation: spinner-page 1.1s infinite ease;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
      }
    `}

  ${({ modal }) =>
    modal &&
    css`
      &,
      &:before,
      &:after {
        background: gray;
        -webkit-animation: spinner-modal 1s infinite ease-in-out;
        animation: spinner-modal 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
      }
      & {
        flex: none;
        color: gray;
        text-indent: -9999em;
        margin: 40vh auto;
        position: relative;
        font-size: 1.2rem;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
      &:before,
      &:after {
        position: absolute;
        top: 0;
        content: "";
      }
      &:before {
        left: -1.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      &:after {
        left: 1.5em;
      }

      @media (max-width: 1024px) {
        & {
          font-size: 0.8rem;
        }
      }
    `}

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
        border-top: 5px solid rgba(0, 0, 0, 0.2);
        border-right: 5px solid rgba(0, 0, 0, 0.2);
        border-bottom: 5px solid rgba(0, 0, 0, 0.2);
        border-left: 5px solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: spinner-button 1.1s infinite linear;
        animation: spinner-button 1.1s infinite linear;
      }
    `}
`;
