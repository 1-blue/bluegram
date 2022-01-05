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
    border-radius: 0.4em;

    & > li {
      max-width: 400px;
      min-width: 200px;
      width: 30vw;
      height: 48px;
      line-height: 36px;
      display: flex;
      justify-content: center;
      padding: 0.4em 0.8em;
      text-align: center;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:last-child {
        border-bottom: 0;
      }

      &:first-child {
        border-radius: 0.4em 0.4em 0 0;
      }
      &:last-child {
        border-radius: 0 0 0.4em 0.4em;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
