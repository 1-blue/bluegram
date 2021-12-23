import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  padding: 0.8rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  & > .like-count {
    font-weight: bold;
    color: #505050;
    margin-bottom: 0.5rem;
  }
  & > .past-time {
    font-size: 0.6rem;
    color: gray;
  }
`;
