import styled from "styled-components";

export const Wrapper = styled.section`
  position: relative;
  display: inline-block;
  width: 60%;
  height: ${({ height }) => height}%;

  & > .image-container {
    display: -webkit-inline-box;
    float: left;
    overflow: hidden;
    width: 100%;
    height: 100%;

    & > li {
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem 0 0 1rem;
      background-size: cover;
    }
  }

  & > .prev-button,
  & > .next-button {
    position: absolute;
    top: 50%;
    background-color: rgba(125, 125, 125, 0.5);
    border-radius: 100%;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
    transform: translateY(-50%);
  }
  & > .next-button {
    right: 2%;
  }
  & > .prev-button {
    left: 2%;
  }

  & > .dots {
    display: inline-flex;
    position: absolute;
    top: 88%;
    left: 50%;
    transform: translateX(-50%);
    cursor: no-drop;

    & > li {
      font-size: 2rem;
      color: white;
    }
  }
  & > .image-number {
    position: absolute;
    top: 94%;
    left: 50%;
    background-color: rgba(100, 100, 100, 0.3);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    transform: translateX(-50%);
  }
`;
