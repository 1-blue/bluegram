import { SideScroll, SideSearch } from "@src/styles/animation";
import styled from "styled-components";

export const Wrapper = styled.aside<{ isDown: boolean }>`
  z-index: 1;
  position: fixed;
  bottom: ${({ isDown }) => (isDown ? "20px" : "80px")};
  right: 20px;
  transition: all 0.4s;

  & button[type="button"] {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.color.blue},
      ${({ theme }) => theme.color.main}
    );
    color: white;
  }
`;

export const ScrollUpButton = styled.button<{ isDown: boolean }>`
  position: fixed;
  bottom: ${({ isDown }) => (isDown ? "90px" : "150px")};
  right: 40px;
  transition: all 0.4s;

  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: ${({ theme }) => theme.color.main};
  color: white;

  animation: ${SideScroll} 0.4s ease-out;
`;
export const SearchButton = styled.button<{ isDown: boolean }>`
  position: fixed;
  bottom: ${({ isDown }) => (isDown ? "40px" : "100px")};
  right: 90px;
  transition: all 0.4s;

  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: ${({ theme }) => theme.color.main};
  color: white;

  animation: ${SideSearch} 0.4s ease-out;
`;

export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  input[type="search"] {
    padding: 8px;
    outline: none;
    border: ${({ theme }) => theme.color.main} 3px solid;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
  }
  button[type="submit"] {
    padding: 9px;
    background-color: ${({ theme }) => theme.color.main};
    color: white;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
