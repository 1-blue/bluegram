import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  & > .post-head-username {
    margin-left: 0.6rem;
  }

  & > .post-conent-head-follow-button {
    margin-left: 0.6rem;
    font-weight: bold;
    color: var(--facebook-color);
  }
`;
