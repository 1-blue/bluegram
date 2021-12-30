import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  cursor: auto;

  .close-modal-button {
    position: fixed;
    top: 1%;
    right: 1%;
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
  }
`;

export const Modal = styled.div`
  position: relative;
  max-width: 60vw;
  min-width: 350px;
  background: white;
  border-radius: 1em;

  & > .modal-title {
    text-align: center;
    padding: 0.8em 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  ${({ length }) =>
    length
      ? css`
          display: flex;
          flex-flow: column nowrap;
          min-height: 400px;
          width: 80vw;
          height: 80vh;

          & > .modal-flex-container {
            flex: 1 1 auto;

            display: flex;
            flex-flow: column nowrap;

            & > .modal-form {
              flex: 1 1 150px;

              display: flex;
              width: 100%;

              & > .modal-form-info {
                flex: 0 1 150px;

                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                padding: 0.5em 1em;
                border-right: 1px solid rgba(100, 100, 100, 0.2);
              }

              & > .modal-form-textarea {
                flex: 1 1 auto;

                width: 100%;
                padding: 0 0.5em;
                border: 0;
                border-radius: 0 0 1em 0;
                font-size: 1rem;
                font-weight: 500;
                resize: none;
              }

              & > .modal-form-text-length {
                position: absolute;
                bottom: 0;
                right: 16px;
                font-size: 0.8rem;
                color: gray;
              }
            }
          }

          @media (min-width: 1024px) {
            max-width: 80vw;
            max-height: 90vh;

            & > .modal-flex-container {
              flex-flow: row nowrap;

              & > .modal-form {
                flex: 1 1 40%;

                flex-flow: column nowrap;

                & > .modal-form-info {
                  flex: 0 1 100px;

                  flex-flow: row nowrap;
                  justify-content: stretch;
                  border-right: 0;
                  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
                }
              }
              & > section > ul > li > img {
                border-radius: 0 0 0 1em;
              }
            }
          }
        `
      : css`
          width: 80vw;
          height: 80vh;
          min-width: 300px;
          min-height: 300px;
          max-height: 80vh;

          & > .modal-flex-container {
            height: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 2em;

            & > .modal-sub-title {
              font-weight: 300;
              color: gray;
              margin-bottom: 1rem;
            }
          }

          @media (max-width: 480px) {
            & > .modal-flex-container > .modal-sub-title {
              font-size: 0.8rem;
            }
          }
          @media (min-width: 480px) and (max-width: 768px) {
            & > .modal-flex-container > .modal-sub-title {
              font-size: 1rem;
            }
          }
          @media (min-width: 768px) and (max-width: 1024px) {
            & > .modal-flex-container > .modal-sub-title {
              font-size: 1.2rem;
            }
          }
        `}

  @media (max-width: 480px) {
    & > .modal-title {
      font-size: 0.8rem;
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    & > .modal-title {
      font-size: 0.9rem;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    & > .modal-title {
      font-size: 1rem;
    }
  }
  /* @media (min-width: 1024px) {
    height: 60vh;
  } */
  /* @media (min-width: 1600px) {
    height: 90vh;
  } */

  animation-name: back-in-down;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
`;
