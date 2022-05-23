import styled from "styled-components";

export const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8em;

  & > button[type="button"] {
    margin-right: 0.5em;
    opacity: 0.8;
    &:last-child {
      margin-right: 0;
    }
  }
  & .post-card-buttons-heart {
    color: red;
    &:hover {
      opacity: 1;
    }
  }
  & .post-card-buttons-comment {
    color: green;
    &:hover {
      opacity: 1;
    }
  }
  & .post-card-buttons-airplane {
    color: cadetblue;
    &:hover {
      opacity: 1;
    }
  }
  & .post-card-buttons-bookmark {
    color: blue;
    &:hover {
      opacity: 1;
    }
  }

  // 아무 능력 없음 그냥 남는 공간을 차지함 ( bookmark를 우측 끝으로 붙이기 위함 )
  & .post-card-buttons-empty-place {
    flex: 1 auto;
  }
`;
