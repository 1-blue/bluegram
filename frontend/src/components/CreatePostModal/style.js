import styled from "styled-components";

export const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);

  /* 모달 */
  & .modal {
    position: relative;
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-flow: column nowrap;
    background: white;
    border-radius: 0.2em;
    box-shadow: 4px 4px 10px black;

    animation-name: slide-scale;
    animation-delay: 0;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    animation-duration: 1s;
  }

  /* 모달 닫기 버튼 */
  & .modal-close-button {
    position: fixed;
    top: 1.5vh;
    right: 1.5vw;
    font-size: 2rem;
    text-shadow: 4px 4px 5px black;
  }

  /* 다음으로 넘어가는 버튼 ( 이미지 입력받기 -> 이미지 수정 -> 게시글 컨텐츠 입력 ) */
  & .modal-next-button,
  .modal-create-button {
    position: absolute;
    top: 2%;
    right: 2%;
    color: var(--light-blue);
  }

  /* 이전으로 넘어가는 버튼 */
  & .modal-previous-button {
    position: absolute;
    top: 2%;
    left: 2%;
    color: var(--light-blue);
  }

  /* 모달 헤드 */
  & .modal-head {
    text-align: center;
    padding: 0.4em;
    border-bottom: 1px solid gray;
    font-size: 1.5rem;
  }

  /* 모달 바디 */
  & .modal-body {
    flex: 1 0 auto;
    font-size: 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  /* 모달 바디에 텍스트 */
  & .modal-body-title {
    margin-bottom: 1em;
  }

  /* 프리뷰 캐루셀에서 프리뷰 제거버튼위치를 지정하기 위한 wrapper */
  & .modal-preview-carousel-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* 프리뷰 캐루셀에 정해진 프리뷰 제거 */
  & .modal-preview-remove-button,
  .modal-preview-remove-spinner {
    position: absolute;
    top: 2%;
    right: 2%;
  }

  /* 프리뷰 케루셀에 프리뷰 추가 */
  & .modal-preview-append-button {
    position: absolute;
    bottom: 2%;
    right: 2%;
  }

  & .modal-form {
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & .modal-form-info {
      display: flex;
      align-items: center;
      margin-bottom: 1em;
    }
  }

  & .modal-form-textarea {
    flex: 1 0 auto;
    width: 100%;
    resize: none;
    border-radius: 0 0 0.2em 0.2em;
  }

  & .modal-form-text-length {
    position: absolute;
    right: 2%;
    bottom: 2%;
  }

  @media (max-width: 1024px) {
    & .modal {
      height: 60vh;
    }
    & .modal-head {
      font-size: 1rem;
    }
    & .modal-body {
      font-size: 0.8rem;
    }

    /* 프리뷰 캐루셀에 정해진 프리뷰 제거 */
    /* 다음으로 넘어가는 버튼 ( 이미지 입력받기 -> 이미지 수정 -> 게시글 컨텐츠 입력 ) */
    & .modal-preview-remove-button,
    .modal-preview-remove-spinner,
    .modal-next-button,
    .modal-create-button {
      top: 1.4%;
      right: 1.4%;
    }
    /* 이전으로 넘어가는 버튼 */
    & .modal-previous-button {
      top: 1.4%;
      left: 1.4%;
    }
  }
`;
