import styled from "styled-components";

export const Wrapper = styled.ul`
  position: relative;
  display: flex;
  align-items: baseline;

  & > li {
    margin-left: 1.5rem;
    cursor: pointer;
    height: 24px;
    font-weight: bold;
  }
  & > li:first-child {
    margin-left: 0rem;
  }

  @media (max-width: 480px) {
    & > li {
      margin-left: 0.5rem;
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    & > li {
      margin-left: 0.75rem;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    & > li {
      margin-left: 1rem;
    }
  }
`;
