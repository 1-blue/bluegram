import styled from "styled-components";

export const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  & > .dialog-container {
    display: flex;
    flex-flow: column nowrap;
    background: white;
    border-radius: 1em;

    & > li {
      width: 200px;
      height: 48px;
      line-height: 36px;
      padding: 0.4em 0.8em;
      text-align: center;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:last-child {
        border-bottom: 0;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
