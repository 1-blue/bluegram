import styled from "styled-components";

export const Wrapper = styled.footer`
  padding: 4vh 0 10vh;
  margin-bottom: 7vh;
  background: #272727;
  text-align: center;

  /* footer의 제목 */
  & .footer-title {
    color: white;
    margin-bottom: 4vh;
  }

  /* footer의 링크들을 감싸는 li */
  & .footer-link-list {
    display: inline-block;

    &::before {
      content: " | ";
      margin: 0 1em;
      color: white;
    }
    &:first-child::before {
      content: "";
      margin: 0;
    }
  }

  /* footer의 링크들 */
  & .footer-link {
    color: white;
  }

  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;
