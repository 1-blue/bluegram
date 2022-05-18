import styled from "styled-components";

export const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: ${({ theme }) => theme.color.white};
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 2px solid gray;
  height: 7vh;

  & .nav-link {
    height: 100%;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid gray;
    cursor: pointer;

    &:first-child {
      border-left: 0;
    }
    &:last-child {
      border-right: 0;
    }

    &:hover {
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.dark};
      transition: all 0.4s;
    }
  }
`;
