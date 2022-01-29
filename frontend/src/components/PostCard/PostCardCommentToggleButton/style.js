import styled, { css } from "styled-components";

export const Wrapper = styled.li`
  text-align: center;
  margin-bottom: 0.8rem;

  & .post-card-toggle-comment-button {
    font-size: 0.82em;
    font-weight: bold;
    color: gray;
  }

  ${({ $recomment }) =>
    $recomment &&
    css`
      text-align: start;
      margin: 0 0 0.8em 3em;
    `}
`;
