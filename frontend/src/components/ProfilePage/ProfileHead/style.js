import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1em;

  & > .profile-head-right {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;

    & > span {
      flex: 1 0 auto;
      font-size: 1.6rem;
    }

    & > button {
      flex: 1 0 auto;
      width: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.2em;
      font-weight: bold;
    }
  }
`;
