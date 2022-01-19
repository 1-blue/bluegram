import styled from "styled-components";

export const Wrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8em;

  & .post-card-buttons-heart,
  .post-card-buttons-comment {
    margin-right: 0.6em;
  }

  // 아무 능력 없음 그냥 남는 공간을 차지함 ( bookmark를 우측 끝으로 붙이기 위함 )
  & .post-card-buttons-empty-place {
    flex: 1 auto;
  }
`;
