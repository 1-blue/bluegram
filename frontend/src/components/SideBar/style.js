import styled from "styled-components";

export const Wrapper = styled.aside`
  position: fixed;
  right: 4px;
  bottom: 8vh;
  z-index: 100;
  display: flex;

  /* 사이드 바 버튼들 */
  .side-bar-button {
    width: 40px;
    height: 40px;
    margin-right: 0.4em;
    background: #222222;
    color: white;
    box-shadow: 4px 4px 10px #222222;
    font-size: 0.8rem;
    font-weight: 900;
    text-align: center;
    line-height: 50px;
    border-radius: 100%;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }

  /* 검색 폼 */
  .modal-search-form {
    display: flex;
  }

  /* 검색 */
  .modal-search-input {
    padding: 0.6em;
    font-size: 1rem;
    font-weight: 700;
    font-family: inherit;
    border: 2px solid var(--light-blue);

    &::placeholder {
      font-size: 0.8rem;
    }
  }

  @media (min-width: 1024px) {
    bottom: 1vh;
  }
`;
