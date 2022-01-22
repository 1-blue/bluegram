import styled from "styled-components";

export const Wrapper = styled.article`
  max-width: 768px;
  margin: auto;

  /* 팔로워/팔로잉 모달 */
  & .follow-modal {
    width: 280px;
    background: white;
    border-radius: 0.4em;
    padding: 0.2em 1em;
  }

  /* 팔로워/팔로잉 리스트 */
  & .follow-modal-follow-list {
    display: flex;
    align-items: center;
    margin-bottom: 0.4em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* 팔로워/팔로잉 아바타 */
  & .follow-modal-follow-avatar {
    margin-right: 0.6em;
  }

  /* 팔로워/팔로잉 이름 */
  & .follow-modal-follow-name {
    font-size: 0.9em;
    font-weight: 700;
  }

  /* 아무 의미 없이 flex의 남은 공간 차지를 위해 사용 */
  & .no-content {
    flex: 1;
  }

  /* 팔로우/언팔로우 버튼 */
  & .follow-modal-follow-button {
    text-align: end;
    font-size: 0.8em;
  }

  /* 팔로워/팔로잉이 없을 경우 */
  & .follow-modal-no-follow-icon,
  .follow-modal-no-follow-title,
  .follow-modal-no-follow-description {
    text-align: center;
  }
  & .follow-modal-no-follow-title {
    font-size: 1rem;
    color: gray;
  }
  & .follow-modal-no-follow-description {
    font-size: 0.8rem;
    word-break: keep-all;
  }
`;
