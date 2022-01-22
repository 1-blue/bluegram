import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  border-bottom: 1px solid #ccccdd;
  margin-bottom: 1em;

  & .nav-list {
    flex: 1;
    text-align: center;
    padding: 0.4em 0;
  }

  ${({ kinds }) => {
    switch (kinds) {
      case "post":
        return css`
          & .nav-list:nth-child(1) {
            border-bottom: 2px solid black;
          }
        `;
      case "detailPost":
        return css`
          & .nav-list:nth-child(2) {
            border-bottom: 2px solid black;
          }
        `;
      case "bookmark":
        return css`
          & .nav-list:nth-child(3) {
            border-bottom: 2px solid black;
          }
        `;

      default:
        break;
    }
  }}
`;
