import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 210px;
  height: auto;
  border-radius: 5px;
  background: white;
  box-shadow: 2px 2px 10px gray;
  z-index: 1;

  & > li {
    padding: 0.5em 1em;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
      background-color: rgba(128, 128, 128, 0.05);
    }

    & > a {
      display: flex;
      align-items: center;

      & > span {
        margin-left: 1em;
      }
    }
  }
  & > li:last-child {
    border-top: 1px solid rgba(128, 128, 128, 0.2);

    & > a > span {
      margin-left: 0;
    }
  }

  @media (max-width: 480px) {
    width: 90px;
    & > li {
      font-size: 0.6rem;
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    width: 130px;
    & > li {
      font-size: 0.7rem;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 170px;
    & > li {
      font-size: 0.8rem;
    }
  }

  animation-name: appear-scale;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;
