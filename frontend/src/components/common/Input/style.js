import styled from "styled-components";

export const Wrapper = styled.input`
  &[type="text"],
  &[type="password"] {
    width: 60%;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    border: 1px solid purple;
    margin-bottom: 0.3rem;
  }

  &[type="file"] {
    display: none;
  }

  &:focus {
    box-shadow: 0 0 3px purple;
  }

  &::placeholder {
    font-size: 0.7rem;
    color: rgba(128, 0, 128, 0.5); // purple
  }
`;
