import styled from "styled-components";

export const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: var(--background-color);
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 2px solid gray;

  & .nav-link {
    position: relative;
    flex: 1 0 auto;
    text-align: center;
    padding: 1em;
    border-right: 2px solid gray;

    &:last-child {
      padding: 0.8em;
      border-right: 0;
    }
  }
`;
