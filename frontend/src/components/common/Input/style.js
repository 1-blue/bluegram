import styled from "styled-components";

export const Wrapper = styled.input`
  &[type="text"],
  &[type="password"] {
    width: 60%;
    padding: 0.5em;
    margin-bottom: 0.3em;
    border: 1px solid purple;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
  }

  &[type="file"] {
    display: none;
  }

  &:focus {
    box-shadow: 0 0 3px var(--main-color);
  }

  &::placeholder {
    font-size: 0.7rem;
    color: var(--main-color);
    opacity: 0.5;
  }
`;
