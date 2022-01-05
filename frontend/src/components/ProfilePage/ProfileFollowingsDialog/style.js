import styled from "styled-components";

export const Wrapper = styled.aside`
  & > aside > ul > li {
    & > a > .dialog-user-name {
      margin-right: 0.6em;

      &:hover {
        text-decoration: underline;
      }
    }
    & > .dialog-follow-button {
      color: var(--light-blue);
    }
    & > .dialog-remove-button {
      color: rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 0.4em;
    }

    & > button:last-child {
      margin-left: auto;
    }
  }
`;
