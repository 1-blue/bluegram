import styled from "styled-components";

export const Wrapper = styled.li`
  display: flex;
  padding: 0.4em;

  & > img {
    margin-right: 0.4em;
  }

  & > .comment-container {
    flex: 1 0 auto;

    & > .comment-username {
      display: block;
      margin-bottom: 0.4em;
    }
    & > .comment-content {
      margin-bottom: 0.8em;
    }
    & > .comment-option-list {
      & > .comment-time {
        color: gray;
        font-size: 0.7rem;
      }
      & > .comment-like-button {
        color: gray;
        font-size: 0.7rem;
      }
      & > .comment-recomment-button {
        color: gray;
        font-size: 0.7rem;
      }

      & i {
        vertical-align: sub;
      }
    }
  }
`;
