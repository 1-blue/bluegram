import styled from "styled-components";

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

  .post-head-1 {
    display: none;
  }
  .post-head-2 {
    display: flex;
  }

  .modal {
    width: 80vw;
    max-width: 1300px;
    max-height: 750px;
    display: flex;
    background-color: white;
    border-radius: 0.4em;

    & > .post-one-image {
      width: 70%;
      border-radius: 0.4em 0 0 0.4em;
    }

    & > .post {
      flex: 1 1 40%;

      display: inline-flex;
      flex-direction: column;
      width: 40%;
      vertical-align: top;

      .post-scroll {
        flex-grow: 1;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }

        & > .post-comment {
          padding: 1em;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .post-head-1 {
      display: flex;
    }
    .post-head-2 {
      display: none;
    }

    .modal {
      width: 80vw;
      height: 90vh;
      display: flex;
      flex-flow: column nowrap;
      background-color: white;
      border-radius: 1rem;

      & > .post-one-image {
        width: 100%;
        border-radius: 0;
      }

      & > .post {
        display: inline-flex;
        flex-direction: column;
        vertical-align: top;

        width: 100%;

        .post-scroll {
          flex: 1 1 0;
          overflow: auto;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .modal {
      height: 80vh;
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    .modal {
      height: 90vh;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .modal {
      height: 95vh;
    }
  }
  @media (min-width: 1024px) {
    .modal {
      height: auto;
    }
  }
  @media (min-width: 1600px) {
    .modal {
      height: 80vh;
    }
  }

  @media (min-width: 1024px) {
    .modal > section > ul > li > img {
      border-radius: 0.4em 0 0 0.4em;
    }
  }

  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
`;
