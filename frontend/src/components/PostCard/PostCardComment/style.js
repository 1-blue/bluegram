import styled from "styled-components";

export const Wrapper = styled.ul`
  margin-bottom: 1.2em;

  & .post-card-comment {
    display: flex;
    padding: 0 0.8em 0.8em 0.8em;
  }

  /* 댓글 작성자 프사 */
  & .post-card-comment-avatar {
    margin-right: 0.8em;
  }

  /* 배치를 위해 댓글 컨텐츠를 감싼 태그 */
  & .post-card-comment-content-wrapper {
    width: 75%;
  }
  /* 댓글의 컨텐츠 */
  & .post-card-comment-content {
    margin-bottom: 0.4em;
  }
  /* 댓글 작성자명 */
  & .post-card-comment-user-name {
    font-weight: bold;
    cursor: pointer;
    margin-right: 0.4em;
    font-size: 0.95rem;
  }
  /* 댓글 내용 */
  & .post-card-comment-text {
    font-size: 0.95rem;
    word-break: break-all;
  }
  /* 댓글 작성 시간 */
  & .post-card-comment-created-at,
  .post-card-comment-recomment-button {
    font-size: 0.7rem;
    color: gray;
    margin-right: 0.8em;
  }

  /* 댓글 좋아요 버튼 */
  & .post-card-comment-like-button {
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    cursor: default;
  }
`;
