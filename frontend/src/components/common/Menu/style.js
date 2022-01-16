import styled, { css } from "styled-components";

export const Wrapper = styled.ul`
  position: absolute;
  max-width: 250px;
  min-width: 150px;
  width: 20vw;
  height: auto;
  border-radius: 5px;
  background: white;
  box-shadow: 2px 2px 10px gray;
  z-index: 1;

  /* 프로필 메뉴일 경우 */
  ${({ $profile }) =>
    $profile &&
    css`
      top: 80px;
      right: 20px;

      & .nav-profile-menu-list {
        padding: 1em 1em;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s;
        border-top: 1px solid rgba(128, 128, 128, 0.2);

        &:hover {
          background-color: rgba(128, 128, 128, 0.1);
          transition: all 0s;
        }

        & > li:first-child {
          border-top: 0px;
        }

        & .nav-profile-menu-link {
          display: flex;
          align-items: center;

          & .nav-profile-menu-text {
            margin-left: 1em;
          }
        }
      }
    `}

  /* 프로필 메뉴일 경우 */
  ${({ $comment }) =>
    $comment &&
    css`
      top: 26px;
      right: 10px;

      & .post-card-comment-menu-list {
        padding: 1em 1em;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s;
        border-top: 1px solid rgba(128, 128, 128, 0.2);

        &:hover {
          background-color: rgba(128, 128, 128, 0.1);
          transition: all 0s;
        }

        &:first-child {
          border-top: 0px;
        }
      }
    `}

  animation-name: slide-fade-in;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;
