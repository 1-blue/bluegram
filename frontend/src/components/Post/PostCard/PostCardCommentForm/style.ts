import styled from "styled-components";

export const Wrapper = styled.form`
  position: relative;
  padding: 1em;
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.08);

  /* 댓글 생성 폼의 textarea */
  & .post-card-form-text-area {
    position: relative;
    flex: 1 1 auto;
    resize: none;
    overflow: hidden;
    font-size: 0.9rem;
    border-radius: 0.4em;
    padding: 0.4em;
    font-family: inherit;

    &::placeholder {
      font-weight: bold;
      color: gray;
      font-size: 0.8em;
    }
  }

  /* 댓글 생성 폼의 버튼 */
  & .post-card-comment-form-button {
    margin-left: 0.8em;
  }

  /* 댓글 길이 */
  & .post-card-comment-from-text-length {
    position: absolute;
    right: 54px;
    bottom: 0;
    font-size: 0.8rem;
    color: gray;
  }
`;
