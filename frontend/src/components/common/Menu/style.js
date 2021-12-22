import styled from "styled-components";

export const Wrapper = styled.section`
  width: 200px;
  height: auto;
  position: absolute;
  top: 60px;
  transform: translateX(-50%);
  border-radius: 5px;
  box-shadow: 2px 2px 10px gray;

  & > li {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;

    &:hover {
      background-color: rgba(128, 128, 128, 0.05);
    }

    & > a {
      display: flex;
      align-items: center;

      & > span {
        margin-left: 1rem;
      }
    }
  }
  & > li:last-child {
    border-top: 1px solid rgba(128, 128, 128, 0.2);

    & > a > span {
      margin-left: 0;
    }
  }

  animation-name: menu-appear;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;
