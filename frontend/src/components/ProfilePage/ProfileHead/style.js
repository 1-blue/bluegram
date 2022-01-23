import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  padding: 1em;

  /* 유저의 프로필 이미지 */
  & .user-profile-image {
    margin-right: 1.2em;
  }

  /* 정렬을 위한 플렉스 적용 */
  & .flex-container {
    flex: 1;
    display: inline-flex;
    flex-flow: column nowrap;
  }

  /* 유저명 */
  & .user-name {
    font-size: 1.2rem;
    margin-bottom: 0.4em;
  }

  /* 본인 프로필 페이지일 경우 프로필 수정 버튼 */
  & .profile-edit-link {
    flex: 1;
    text-align: center;
    border: 1px solid #ddddee;
    border-radius: 0.2em;
    line-height: 26px;
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 0.8em;
  }

  /* 타인 프로필 페이지일 경우 팔로우/언팔로우 버튼 */
  & .profile-follow-button {
    flex: 1;
    text-align: center;
    border-radius: 0.2em;
    line-height: 26px;
    font-size: 0.8rem;
    font-weight: bold;
    background: var(--light-blue);
    color: white;
    margin-bottom: 0.8em;
  }

  /* 유저의 자기소개 */
  & .profile-user-about {
    font-family: inherit;
    font-size: 0.8rem;
    white-space: pre-line;
    color: gray;
  }

  ${({ followLoading }) =>
    followLoading &&
    css`
      & .profile-follow-button {
        background: #cccccc;
      }
    `}
`;
