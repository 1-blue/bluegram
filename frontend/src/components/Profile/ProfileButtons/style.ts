import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  border-top: 1px solid #ccccdd;
  border-bottom: 1px solid #ccccdd;

  & .button-list {
    flex: 1;
    text-align: center;
    line-height: 16px;
    padding: 0.4em 0;
  }

  & .button-name {
    font-size: 0.9em;
    color: grey;
  }

  & .count {
    font-size: 0.9em;
    font-weight: bold;
  }
`;
