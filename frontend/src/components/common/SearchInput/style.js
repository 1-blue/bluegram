import styled from "styled-components";

export const Wrapper = styled.input`
  max-width: 240px;
  height: 34px;
  padding: 6px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.2);

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-weight: 700;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
