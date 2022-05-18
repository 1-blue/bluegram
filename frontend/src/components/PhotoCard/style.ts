import styled, { css } from "styled-components";

export const Wrapper = styled.li`
  position: relative;
  cursor: pointer;

  // 게시글의 이미지가 여러개인지 보여주는 아이콘 스타일
  & .more-post-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
  // 게시글 이미지 카드에 마우스 올렸을 때 요약 정보 보여줌
  /* ${({ isMouseHover }) =>
    isMouseHover &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
      }
    `} */
  @media (max-width: 768px) {
    & .kinds {
      top: 5px;
      right: 5px;
    }
  }
`;
