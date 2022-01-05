import styled from "styled-components";

export const Wrapper = styled.section``;

export const PostsWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 12px;

  @media (max-width: 480px) {
    gap: 2px;
    grid-template-columns: repeat(1, auto);
  }
  @media (min-width: 480px) and (max-width: 768px) {
    gap: 4px;
    grid-template-columns: repeat(2, auto);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 8px;
  }
  @media (min-width: 1024px) and (max-width: 1600px) {
    gap: 10px;
  }
`;
