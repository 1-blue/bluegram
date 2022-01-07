import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding: 0.4em;

  & > img {
    margin-right: 0.4em;
  }

  & > .recomment-container {
    flex: 1 0 auto;

    position: relative;
    display: inline-block;
    width: 80%;

    & > .recomment-username {
      display: block;
      margin-bottom: 0.4em;
    }
    & > .recomment-content {
      display: inline-block;
      margin-bottom: 0.4em;
      width: 90%;
      white-space: pre-wrap;
      word-break: break-word;
    }
    & > .recomment-option-list {
      & > .recomment-time {
        color: gray;
        font-size: 0.7rem;
        padding-right: 0.8em;
      }
      & > .recomment-like-button {
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
