import styled, { css } from "styled-components";

export const Wrapper = styled.span`
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;

  ${({ $hashtagTitle }) =>
    $hashtagTitle &&
    css`
      font-size: 1.2rem;
      margin: 3vh 0 6vh;
      text-shadow: 0 0 4px black, 0 0 10px blueviolet, 0 0 20px purple;
      color: white;
    `}

  ${({ $postEnd }) =>
    $postEnd &&
    css`
      font-size: 1.2rem;
      margin: 6vh 0;
    `}

  ${({ $success }) =>
    $success &&
    css`
      display: inline-block;
      width: 60%;
      text-align: left;
      font-size: 0.6rem;
      color: var(--success-color);
      margin-bottom: 0.8em;
      &::before {
        content: "O ";
      }
    `}

  ${({ $error }) =>
    $error &&
    css`
      display: inline-block;
      width: 60%;
      text-align: left;
      font-size: 0.6rem;
      color: var(--error-color);
      margin-bottom: 0.8em;
      &::before {
        content: "X ";
      }
    `}
`;
