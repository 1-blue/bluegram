import styled from "styled-components";

export const Wrapper = styled.form`
  flex: 0 1 0;

  display: flex;

  & > textarea {
    flex: 1 1 auto;

    width: 100%;
    font-size: 1rem;
    font-weight: 450;
    padding: 0.8em 1em;
    border: 0;
    border-radius: 0 0 0 1em;
    resize: none;

    &::placeholder {
      color: gray;

      font-weight: 600;
      font-size: 0.8em;
    }
  }

  & > button {
    flex: 0 0 10%;
    text-align: center;
    color: var(--light-blue);
    border-radius: 0 0 1em 0;
    background: white;
  }

  @media (min-width: 1024px) {
    & > button {
      flex: 0 0 20%;
    }
  }
`;
