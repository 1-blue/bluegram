import styled from "styled-components";

export const Wrapper = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1em;

  // 게시글 작성자 프로필 이미지
  & .post-card-head-user-avatar {
    margin-right: 0.8em;
  }

  // 게시글 작성자 이름
  & .post-card-head-user-name {
    font-weight: bold;

    &::after {
      content: "ㆍ";
    }
  }

  // 아무 능력 없음 그냥 남는 공간을 차지함 ( optionButton을 우측 끝으로 붙이기 위함 )
  & .post-card-head-empty-place {
    flex: 1;
  }

  // 옵션 버튼 스타일 ( 하단에 붙어서 아이콘 크기만큼 line-height부여 )
  & .post-card-head-option-button {
    line-height: 24px;
  }
`;
