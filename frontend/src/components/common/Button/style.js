import styled, { css } from "styled-components";

export const Wrapper = styled.button`
  /* 회원가입 스타일 */
  ${({ $signup }) =>
    $signup &&
    css`
      position: relative;
      margin: 1rem 0;
      padding: 1rem 2rem;
      border: 3px solid purple;
      border-radius: 10px;
      font-size: 1.5rem;
      font-weight: bold;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: purple;
        transform: scale(0, 1);
        transition: all 0.35s;
      }
      &:hover::after {
        transform: scale(1, 1);
      }

      .button-text {
        position: relative;
        z-index: 2;
        color: purple;
        transition: all 0.35s;
      }
      &:hover .button-text {
        color: white;
      }

      @media (max-width: 480px) {
        margin: 0.6rem 0;
        padding: 0.6rem 1.4rem;
        border: 1px solid purple;
        border-radius: 6px;
        font-size: 1rem;
      }
      @media (min-width: 480px) and (max-width: 768px) {
        margin: 0.8rem 0;
        padding: 0.8rem 1.6rem;
        border: 2px solid purple;
        border-radius: 8px;
        font-size: 1.2rem;
      }
    `}

  /* 일반 로그인 스타일 */
  ${({ $local }) =>
    $local &&
    css`
      position: relative;
      width: 60%;
      padding: 0.5rem;
      background: var(--main-color);
      color: white;
      margin-bottom: 0.3rem;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    `}

  /* 페이스북 로그인 스타일 */
  ${({ $facebook }) =>
    $facebook &&
    css`
      position: relative;
      width: 60%;
      padding: 0.5rem;
      background: var(--facebook-color);
      color: white;
      margin-bottom: 0.3rem;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    `}

  /* 네이버 로그인 스타일 */
  ${({ $naver }) =>
    $naver &&
    css`
      position: relative;
      width: 60%;
      padding: 0.5rem;
      background: var(--naver-color);
      color: white;
      margin-bottom: 0.3rem;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    `}

  /* 카카오 로그인 스타일 */
  ${({ $kakao }) =>
    $kakao &&
    css`
      position: relative;
      width: 60%;
      padding: 0.5rem;
      background-color: var(--kakao-color);
      color: white;
      margin-bottom: 1rem;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    `}

  /* 이미지 업로드 버튼 */
  ${({ $upload }) =>
    $upload &&
    css`
      position: relative;
      padding: 0.5rem 1rem;
      background: #0095f6;
      color: white;
      border-radius: 5px;
      font-weight: 700;
    `}

  /* 팔로우 버튼 */
  ${({ $follow }) =>
    $follow &&
    css`
      font-weight: bold;
      color: var(--light-blue);
    `}

  /* 댓글 제출 버튼 */
  ${({ $comment }) =>
    $comment &&
    css`
      font-weight: bold;
      color: var(--light-blue);
    `}
`;
