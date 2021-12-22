import styled from "styled-components";

export const Wrapper = styled.section`
  width: 60%;
  border: 2px solid var(--main-color);
  border-radius: 10px;
  padding: 0.2rem;
  cursor: pointer;

  & > div {
    width: 100%;
    height: 200px;
    background-color: #cdcdcd;
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
      color: var(--main-color);
    }
  }

  & > input[type="file"] {
    display: none;
  }
`;
