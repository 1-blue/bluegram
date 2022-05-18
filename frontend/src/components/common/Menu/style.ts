import styled, { css } from "styled-components";

type Props = { $profile?: boolean; $post?: boolean; $comment?: boolean };

export const Wrapper = styled.ul<Props>`
  position: absolute;
  max-width: 250px;
  min-width: 150px;
  width: 20vw;
  height: auto;
  border-radius: 5px;
  background: white;
  box-shadow: 2px 2px 10px gray;
  z-index: 1;

  & > li {
    display: flex;
    align-items: center;
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
    & > a {
      display: flex;
      align-items: center;
    }
    & span {
      margin-left: 1em;
      font-size: 1.2em;
    }
  }
  /* 프로필 메뉴일 경우 */
  ${({ $profile }) =>
    $profile &&
    css`
      top: 80px;
      right: 20px;
    `}
  /* 게시글 메뉴일 경우 */
  ${({ $post }) =>
    $post &&
    css`
      top: 64px;
      right: 10px;
    `}
  /* 댓글 메뉴일 경우 */
  ${({ $comment }) =>
    $comment &&
    css`
      top: 26px;
      right: 10px;
    `} /* animation-name: slide-fade-in;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-duration: 0.5s;
  animation-fill-mode: forwards; */
`;
