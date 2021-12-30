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

    & > .recomment-username {
      display: block;
      margin-bottom: 0.4em;
    }
    & > .recomment-content {
      margin-bottom: 0.8em;
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

      & > i {
        vertical-align: sub;
      }
    }

    & > i {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
`;
