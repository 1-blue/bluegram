import styled, { css } from "styled-components";

export const Wrapper = styled.li`
  & > .post-image-container {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;

    & > .post-image {
      width: 100%;
      height: 100%;
    }

    ${({ isMouseHover }) =>
      isMouseHover &&
      css`
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
        }
      `}

    & > .post-information {
      position: absolute;
      top: 50%;
      left: 50%;
      color: white;
      z-index: 1;
      transform: translate(-50%, -50%);

      & > div {
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.3em;

        & > span {
          margin-left: 1em;
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }

    & > .kinds {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
    }
  }
`;
