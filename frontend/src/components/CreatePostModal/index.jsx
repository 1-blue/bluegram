// 2021/12/22 - 게시글 생성 모달 - by 1-blue

import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// action
import { uploadImagesAction, createPostAction, resetMessageAction } from "@store/actions";

// components
import Avatar from "@components/common/Avatar";

const CreatePostModal = ({ showCreatePostModal, onCloseCreatePostModal }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { createPostDone, createPostError } = useSelector(state => state.post);
  const { imagePreviews } = useSelector(state => state.image);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const [title, setTitle] = useState("새 게시물 만들기");
  const [text, setText] = useState("");

  // 2021/12/22 - 게시글 생성 성공 or 실패 시 메시지 보여주고 모달 닫기
  useEffect(() => {
    if (!(createPostDone || createPostError)) return;
    alert(createPostDone || createPostError);

    dispatch(resetMessageAction());

    onCloseCreatePostModal();
  }, [createPostDone, createPostError, onCloseCreatePostModal]);

  // 2021/12/22 - 모달 외 다른 영역 클릭시 닫기 - by 1-blue
  const handleClickOutside = useCallback(
    ({ target }) => {
      if (showCreatePostModal && !modalRef.current?.contains(target)) onCloseCreatePostModal();
    },
    [modalRef.current, showCreatePostModal],
  );
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 2021/12/22 - 이미지 파일 탐색기로 선택 - by 1-blue
  const imageSelect = useCallback(e => {
    const formData = new FormData();

    [...e.target.files].forEach(image => formData.append("images", image));

    dispatch(uploadImagesAction(formData));

    setTitle("새 게시물 만들기");
  }, []);

  // 2021/12/22 - 이미지 드래그 앤 드랍 - by 1-blue
  const imageDragAndDrop = useCallback(e => {
    e.preventDefault();

    const formData = new FormData();

    [...e.dataTransfer.files].forEach(image => formData.append("images", image));

    dispatch(uploadImagesAction(formData));

    setTitle("새 게시물 만들기");
  }, []);

  // 2021/12/22 - 텍스트 입력받기 - by 1-blue
  const onInputText = useCallback(e => {
    setText(e.target.value);
  }, []);

  // 2021/12/22 - 게시글 생성 - by 1-blue
  const onSubmitPost = useCallback(
    e => {
      e.preventDefault();

      dispatch(createPostAction({ content: text, images: imagePreviews }));
    },
    [text, imagePreviews],
  );

  return (
    <Wrapper>
      <button type="button" className="close-modal-button" onClick={onCloseCreatePostModal}>
        X
      </button>
      {imagePreviews ? (
        <div className="modal-input-text" ref={modalRef}>
          <h1 className="modal-title">{title}</h1>
          <img src={process.env.IMAGE_URL + "/" + imagePreviews[0]} alt="사용자가 등록한 이미지" />
          <form className="modal-form" onSubmit={onSubmitPost}>
            <div className="modal-form-user-profile">
              <Avatar
                width={40}
                height={40}
                src={`${process.env.IMAGE_URL}/${me.Images[0].name ? me.Images[0].name : me.Images[0].url}`}
              />
              <span className="modal-form-user-profile-name">{me.name}</span>
            </div>

            <textarea className="modal-form-textarea" value={text} onChange={onInputText}></textarea>

            <div className="modal-form-footer">
              <span className="modal-form-text-length">{text.length}/2,200</span>
              <button type="submit" className="modal-form-submit-button">
                게시글 등록
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="modal-input-images"
          ref={modalRef}
          onDragOver={e => e.preventDefault()}
          onDrop={imageDragAndDrop}
        >
          <h1 className="modal-title">{title}</h1>

          <div className="modal-contents">
            <h2 className="modal-sub-title">사진과 동영상을 여기에 끌어다 놓으세요</h2>
            <input type="file" hidden ref={imageRef} accept="image/*" multiple onChange={imageSelect} />
            <button type="button" className="modal-images-input-button" onClick={() => imageRef.current.click()}>
              컴퓨터에서 선택
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

CreatePostModal.propTypes = {
  showCreatePostModal: PropTypes.bool.isRequired,
  onCloseCreatePostModal: PropTypes.func.isRequired,
};

export default CreatePostModal;
