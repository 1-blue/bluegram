import styled from "styled-components";

export const Wrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  & > div {
    display: flex;

    & > li {
      margin-left: 0.8rem;
    }
    & > li:first-child {
      margin-left: 0;
    }
  }
`;
