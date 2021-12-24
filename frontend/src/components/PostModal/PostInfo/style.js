import styled from "styled-components";

export const Wrapper = styled.section`
  flex: 0 1 0;

  display: flex;
  flex-flow: column nowrap;
  padding: 0.8em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  & > .like-count {
    font-weight: bold;
    color: #505050;
    margin-bottom: 0.5em;
  }
  & > .past-time {
    font-size: 0.6rem;
    color: gray;
  }

  @media (max-width: 768px) {
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: baseline;

    & > .past-time {
      font-size: 1rem;
      font-weight: bold;
    }
  }
`;
