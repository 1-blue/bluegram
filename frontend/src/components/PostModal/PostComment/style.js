import styled from "styled-components";

export const Wrapper = styled.li`
  display: flex;
  padding: 0.4em 0;

  & > a > img {
    margin-right: 0.4em;
  }

  & > .comment-container {
    flex: 1 0 auto;

    position: relative;
    display: inline-block;
    width: 80%;

    & > .comment-username {
      display: block;
      margin-bottom: 0.4em;
    }
    & > .comment-content {
      display: inline-block;
      margin-bottom: 0.4em;
      width: 90%;
      white-space: pre-wrap;
      word-break: break-word;
    }
    & > .comment-option-list {
      & > .comment-time {
        color: gray;
        font-size: 0.7rem;
        padding-right: 0.8em;
      }
      & > .comment-like-button {
        color: gray;
        font-size: 0.7rem;
        padding-right: 0.8em;
      }
      & > .comment-recomment-button {
        color: gray;
        font-size: 0.7rem;
        padding-right: 0.8em;
      }
    }

    & > i {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;
