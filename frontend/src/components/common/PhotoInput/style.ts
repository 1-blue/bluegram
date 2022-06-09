import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 2px solid ${({ theme }) => theme.color.main};
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
`;
