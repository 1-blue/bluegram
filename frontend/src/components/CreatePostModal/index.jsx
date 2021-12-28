import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper, Modal } from "./style";

// action
import { uploadImagesAction, createPostAction, resetMessageAction, resetImagePreview } from "@store/actions";

// hook
import useText from "@hooks/useText";

// components
import Avatar from "@components/common/Avatar";
import ImageCarousel from "@components/common/ImageCarousel";
import Button from "@components/common/Button";

const CreatePostModal = ({ showCreatePostModal, onCloseModal }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { createPostDone, createPostError } = useSelector(state => state.post);
  const { imagePreviews } = useSelector(state => state.image);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const [title, setTitle] = useState("");
  const [text, onInputText, setText] = useText("");

  // 2021/12/25 - 게시글 생성 모달창 초기화 메서드 - by 1-blue
  const initializePostModal = useCallback(() => {
    setTitle("새 게시물 만들기");
    setText("");
    dispatch(resetImagePreview());
  }, [setTitle, setText]);

  // 2021/12/25 - 게시글 생성 모달창 초기화 실행 - by 1-blue
  useEffect(() => {
    initializePostModal();
  }, []);

  // 2021/12/22 - 게시글 생성 성공 or 실패 시 메시지 보여주고 모달 닫기
  useEffect(() => {
    if (!(createPostDone || createPostError)) return;
    alert(createPostDone || createPostError);

    dispatch(resetMessageAction());

    onCloseModal();
  }, [createPostDone, createPostError, onCloseModal]);

  // 2021/12/22 - 모달 닫기 이벤트 - by 1-blue
  const handleClickOutside = useCallback(
    ({ target }) => {
      if (showCreatePostModal && !modalRef.current?.contains(target)) {
        if (!confirm("게시글 생성을 취소시겠습니까?")) return;
        onCloseModal();
        initializePostModal();
      }
    },
    [modalRef.current, showCreatePostModal],
  );

  // 2021/12/22 - 모달 닫기 이벤트 등록 - by 1-blue
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

  // 2021/12/22 - 게시글 생성 요청 - by 1-blue
  const onSubmitPost = useCallback(
    e => {
      e.preventDefault();

      dispatch(createPostAction({ content: text, images: imagePreviews }));
    },
    [text, imagePreviews],
  );

  return (
    <Wrapper>
      {/* 모달 닫기 버튼 */}
      <button type="button" className="close-modal-button" onClick={onCloseModal}>
        X
      </button>

      <Modal
        length={imagePreviews?.length}
        ref={modalRef}
        onDragOver={e => e.preventDefault()}
        onDrop={imageDragAndDrop}
      >
        <h1 className="modal-title">{title}</h1>

        {imagePreviews ? (
          // 이미지 업로드 후
          <div className="modal-flex-container">
            {/* image-carousel */}
            <ImageCarousel speed={300} length={imagePreviews.length}>
              {imagePreviews.map(imagePreview => (
                <li key={imagePreview}>
                  <img
                    src={
                      (process.env.NODE_ENV === "production" ? process.env.PROD_IMAGE_URL : process.env.DEV_IMAGE_URL) +
                      "/" +
                      imagePreview
                    }
                    alt="사용자가 등록한 이미지"
                  />
                </li>
              ))}
            </ImageCarousel>

            {/* 게시글 정보 입력 폼 */}
            <form className="modal-form" onSubmit={onSubmitPost}>
              <div className="modal-form-info">
                <Avatar width={40} height={40} image={me.Images[0]} />
                <b>{me.name}</b>
              </div>

              <textarea
                className="modal-form-textarea"
                value={text}
                onChange={onInputText}
                placeholder="🗨️텍스트를 입력하세요😀"
              />

              <span className="modal-form-text-length">{text.length}/2,200</span>

              <Button type="submit" $submit>
                게시
              </Button>
            </form>
          </div>
        ) : (
          // 이미지 업로드 전
          <div className="modal-flex-container">
            <h2 className="modal-sub-title">사진과 동영상을 여기에 끌어다 놓으세요</h2>
            <input type="file" hidden ref={imageRef} accept="image/*" multiple onChange={imageSelect} />
            <Button type="button" onClick={() => imageRef.current.click()} $upload>
              컴퓨터에서 선택
            </Button>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

CreatePostModal.propTypes = {
  showCreatePostModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default CreatePostModal;
