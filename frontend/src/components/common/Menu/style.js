import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  /* 프로필 메뉴일 경우 */
  ${({ $profile }) =>
    $profile &&
    css`
      position: absolute;
      top: 80px;
      right: 20px;
      max-width: 250px;
      min-width: 150px;
      width: 20vw;
      height: auto;
      border-radius: 5px;
      background: white;
      box-shadow: 2px 2px 10px gray;
      z-index: 1;

      & > li {
        padding: 1em 1em;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: rgba(128, 128, 128, 0.1);
          transition: all 0s;
        }

        & > a {
          display: flex;
          align-items: center;

          & > span {
            margin-left: 1em;
          }
        }
      }
      & > li:last-child {
        border-top: 1px solid rgba(128, 128, 128, 0.2);

        & > a > span {
          margin-left: 0;
        }
      }

      animation-name: slide-fade-in;
      animation-direction: normal;
      animation-iteration-count: 1;
      animation-timing-function: ease;
      animation-delay: 0s;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    `}
`;
