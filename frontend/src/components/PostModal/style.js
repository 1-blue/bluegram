import styled from "styled-components";

export const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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

  .modal {
    position: fixed;
    top: 5%;
    left: 10%;
    width: 80vw;
    height: 90vh;
    background-color: white;
    border-radius: 1rem;

    & > .post-image {
      width: 60%;
      height: 100%;
      border-radius: 1rem 0 0 1rem;
    }

    & > .post {
      display: inline-flex;
      flex-direction: column;
      width: 40%;
      height: 100%;
      vertical-align: top;

      .post-scroll {
        flex-grow: 1;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
`;
