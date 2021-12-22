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

  .modal-input-images {
    position: fixed;
    top: 10%;
    left: 20%;
    width: 60vw;
    height: 80vh;
    background-color: white;
    border-radius: 1rem;

    & > .modal-title {
      height: 6%;
      text-align: center;
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    & > .modal-contents {
      height: 94%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & > .modal-sub-title {
        font-weight: 300;
        color: gray;
        margin-bottom: 1rem;
      }

      & > .modal-images-input-button {
        background-color: var(--facebook-color);
        color: white;
        padding: 0.4rem 0.6rem;
        border-radius: 5px;
        font-weight: 700;
      }
    }
  }

  .modal-input-text {
    position: fixed;
    top: 10%;
    left: 10%;
    width: 80vw;
    height: 80vh;
    background-color: white;
    border-radius: 1rem;

    & > .modal-title {
      height: 6%;
      text-align: center;
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    & > img {
      width: 70%;
      height: 94%;
      border-radius: 0 0 0 1rem;
    }

    & > .modal-form {
      display: inline-block;
      vertical-align: top;
      width: 30%;
      height: 50%;

      & > .modal-form-user-profile {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;

        & > .modal-form-user-profile-name {
          margin-left: 1rem;
          font-weight: bold;
        }
      }

      & > .modal-form-textarea {
        width: 100%;
        height: 100%;
        padding: 0 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        border: 0;
        resize: none;
      }

      & > .modal-form-footer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0.5rem;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);

        & > .modal-form-text-length {
          font-size: 0.8rem;
          color: gray;
        }
      }
    }
  }
`;
