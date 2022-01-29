import styled from "styled-components";

export const Wrapper = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 1em 0;
  background: white;
  box-shadow: 0 0 3px black, 0 0 10px var(--main-color);

  & > .form-title {
    font-size: 2rem;
    color: white;
    text-shadow: 0 0 5px black, 0 0 10px var(--main-color), 0 0 20px var(--main-color);
    text-align: center;
    margin-bottom: 0.5em;
  }

  & > .form-footer {
    width: 60%;
    display: flex;
    justify-content: space-between;

    & a {
      font-size: 0.7rem;
      cursor: pointer;
    }
    & a:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    & > .form-title {
      font-size: 1.4rem;
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    & > .form-title {
      font-size: 1.8rem;
    }
  }
`;
