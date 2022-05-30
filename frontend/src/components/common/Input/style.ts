import styled from "styled-components";

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0.6em 0;

  & > label {
    font-size: 0.8rem;
    color: gray;
    align-self: flex-start;
    cursor: pointer;
    margin-bottom: 4px;
  }
  & > span {
    margin-top: 4px;
    font-size: 0.8rem;
    color: red;
    align-self: flex-start;
  }
  & > input {
    width: 100%;
    font-size: 1rem;
    padding: 8px 12px;
    border: 1px solid gray;
    border-radius: 4px;

    &::placeholder {
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
`;
