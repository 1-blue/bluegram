import styled, { css } from "styled-components";

export const Wrapper = styled.button`
  /* 회원가입 스타일 */
  ${({ signup }) =>
    signup &&
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
        background-color: purple;
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
    `}

  /* 일반 로그인 스타일 */
  ${({ local }) =>
    local &&
    css`
      width: 60%;
      padding: 0.5rem;
      background-color: var(--main-color);
      color: white;
      margin-bottom: 0.3rem;
    `}

  /* 페이스북 로그인 스타일 */
  ${({ facebook }) =>
    facebook &&
    css`
      width: 60%;
      padding: 0.5rem;
      background-color: var(--facebook-color);
      color: white;
      margin-bottom: 0.3rem;
    `}

  /* 네이버 로그인 스타일 */
  ${({ naver }) =>
    naver &&
    css`
      width: 60%;
      padding: 0.5rem;
      background-color: var(--naver-color);
      color: white;
      margin-bottom: 0.3rem;
    `}

  /* 카카오 로그인 스타일 */
  ${({ kakao }) =>
    kakao &&
    css`
      width: 60%;
      padding: 0.5rem;
      background-color: var(--kakao-color);
      color: white;
      margin-bottom: 1rem;
    `}
`;
