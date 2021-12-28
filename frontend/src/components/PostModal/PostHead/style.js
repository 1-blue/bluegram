import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  padding: 0.8em 1em;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  & > .post-head-username {
    margin-left: 0.6em;
  }

  & > .post-conent-head-follow-button {
    margin-left: 0.6em;
    font-weight: bold;
    color: var(--facebook-color);
  }

  & > i {
    margin: 0 0 0 auto;
  }
`;
