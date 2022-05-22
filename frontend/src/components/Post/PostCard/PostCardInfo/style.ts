import styled from "styled-components";

export const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0em 0.8em 0.8em 0.8em;

  & .post-card-info-like-count,
  .post-card-info-created-at {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;
