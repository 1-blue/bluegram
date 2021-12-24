import styled from "styled-components";

export const Wrapper = styled.section`
  width: 60%;
  border: 2px solid var(--main-color);
  border-radius: 10px;
  padding: 0.2em;
  cursor: pointer;

  & > div {
    width: 100%;
    height: 200px;
    background-color: rgba(80, 0, 80, 0.6);
    border-radius: 10px;
    text-align: center;
    line-height: 200px;

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    & > span {
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
    }
  }

  @media (max-width: 480px) {
    & > div {
      height: 160px;
      line-height: 160px;

      & > span {
        font-size: 0.8rem;
      }
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    & > div {
      height: 180px;
      line-height: 180px;

      & > span {
        font-size: 1rem;
      }
    }
  }
`;
