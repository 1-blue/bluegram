import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  padding: 1em;

  & .user-profile-image {
    margin-right: 1.2em;
  }

  & .flex-container {
    flex: 1;
    display: inline-flex;
    flex-flow: column nowrap;
  }

  & .user-name {
    font-size: 1.2rem;
    margin-bottom: 0.4em;
  }

  & .profile-edit-link {
    flex: 1;
    text-align: center;
    border: 1px solid #ddddee;
    border-radius: 0.2em;
    line-height: 26px;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;
