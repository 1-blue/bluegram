import styled from "styled-components";

export const Wrapper = styled.li`
  padding: 0 0.8em 0.8em 0.8em;
  font-weight: 600;

  /* 폰트 지정 */
  & .post-card-content-text {
    font-family: inherit;
  }

  /* 해시태그 링크 색상 지정 */
  & .post-card-content-hashtag {
    color: blueviolet;
  }
`;
