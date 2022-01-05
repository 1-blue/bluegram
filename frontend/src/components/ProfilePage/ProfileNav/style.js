import styled from "styled-components";

export const Wrapper = styled.ul`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 1em;

  & > li {
    flex: 1 0 auto;
    text-align: center;
    padding: 1em;
    cursor: pointer;

    & > span:first-child {
      color: gray;
    }

    & > span:last-child {
      font-weight: bold;
    }
  }
`;
