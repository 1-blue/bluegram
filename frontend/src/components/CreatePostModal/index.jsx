/**
 * 생성일: 2022/01/14
 * 수정일: -
 * 작성자: 1-blue
 *
 * 게시글 생성 모달
 * 컴포넌트를 최대한 간단하게 만들려고 했는데 최소한으로 넣어도 넣을게 너무 많아서 300줄짜리...
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Button from "@components/common/Button";
import ImageCarousel from "@components/common/ImageCarousel";
import Avatar from "@components/common/Avatar";
import Spinner from "@components/common/Spinner";

// hooks
import useText from "@hooks/useText";

// action
import {
  resetMessageAction,
  resetImagePreview,
  uploadImagesAction,
  createPostAction,
  removePreview,
} from "@store/actions";

const CreatePostModal = ({ showModal, onCloseModal }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { createPostDone, createPostError } = useSelector(state => state.post);
  const { imagePreviews, uploadImagesLoading, removePreviewLoading } = useSelector(state => state.image);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const [title, setTitle] = useState("");
  const [text, onInputText, setText] = useText("");
  const [step, setStep] = useState(1);
  const [imageNumber, setImageNumber] = useState(0);

  // 2021/12/25 - 게시글 생성 모달창 초기화 메서드 - by 1-blue
  const initializePostModal = useCallback(() => {
    setTitle("새 게시물 만들기");
    setText("");
    setStep(1);
    dispatch(resetImagePreview());
  }, [setTitle, setText, setStep]);

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
      // 조건부로 생성되는 버튼들은 눌러도 창 안닫히도록 처리
      if (target.className === "modal-preview-remove-button") return;
      if (target.className === "modal-next-button") return;
      if (target.className === "modal-create-button") return;
      if (target.className === "modal-previous-button") return;

      if (showModal && !modalRef.current?.contains(target)) {
        if (!confirm("게시글 생성을 취소시겠습니까?")) return;
        onCloseModal();
        initializePostModal();
      }
    },
    [modalRef.current, showModal],
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

    setTitle("이미지 확인 및 수정하기");
    setStep(2);
  }, []);

  // 2021/12/22 - 이미지 드래그 앤 드랍 - by 1-blue
  const imageDragAndDrop = useCallback(e => {
    e.preventDefault();

    const formData = new FormData();

    [...e.dataTransfer.files].forEach(image => formData.append("images", image));

    dispatch(uploadImagesAction(formData));

    setTitle("새 게시물 만들기");
    setStep(2);
  }, []);

  // 2021/12/22 - 게시글 생성 요청 - by 1-blue
  const onSubmitPost = useCallback(
    e => {
      e.preventDefault();

      if (text.length > 500) return alert(`게시글 내용은 500자 이하만 가능합니다.\n( 현재 ${text.length}자 )`);
      if (text.trim().length === 0) return alert("게시글의 내용을 채우고 버튼을 눌러주세요!");

      dispatch(createPostAction({ content: text, images: imagePreviews }));
    },
    [text, imagePreviews],
  );

  //2022/01/14 - 특정 프리뷰 제거 - by 1-blue
  const onClickRemovePreview = useCallback(() => {
    dispatch(removePreview({ preview: imagePreviews[imageNumber - 1] }));
  }, [imagePreviews, imageNumber, setImageNumber]);

  //2022/01/14 - 게시글 모달 보여줄 컨텐츠 - by 1-blue
  const contents = useCallback(() => {
    switch (step) {
      // 이미지 입력받기
      case 1:
        return (
          <>
            <h2 className="modal-body-title">사진과 동영상을 여기에 끌어다 놓으세요</h2>
            <input type="file" hidden ref={imageRef} accept="image/*" multiple onChange={imageSelect} />
            <Button type="button" onClick={() => imageRef.current.click()} $upload style={{ width: "40%" }}>
              컴퓨터에서 선택
            </Button>
          </>
        );

      // 입력받은 이미지 수정하기 ( 순서 변경 및 확인... 추후에 이미지 크롭 추가 )
      case 2:
        return (
          <>
            {uploadImagesLoading ? (
              <Spinner $modal />
            ) : (
              <div className="modal-preview-carousel-wrapper">
                {/* 프리뷰 케루셀 */}
                <ImageCarousel
                  speed={300}
                  images={imagePreviews.map((imagePreview, _id) => ({ name: imagePreview, _id }))}
                  imageNumber={imageNumber}
                  setImageNumber={setImageNumber}
                  $preview
                />
                {/* 특정 프리뷰 제거 버튼 and Spinner */}
                {imagePreviews.length > 1 &&
                  (removePreviewLoading ? (
                    <Spinner className="modal-preview-remove-spinner" $button />
                  ) : (
                    <button type="button" className="modal-preview-remove-button" onClick={onClickRemovePreview}>
                      ❌
                    </button>
                  ))}
                {/* 프리뷰 추가 버튼 */}
                <input type="file" hidden ref={imageRef} accept="image/*" multiple onChange={imageSelect} />
                <Button
                  type="button"
                  onClick={() => imageRef.current.click()}
                  $upload
                  style={{ width: "20%" }}
                  className="modal-preview-append-button"
                >
                  이미지 추가
                </Button>
              </div>
            )}
          </>
        );

      // 게시글 컨텐츠 입력
      case 3:
        return (
          <form className="modal-form" onSubmit={onSubmitPost}>
            <div className="modal-form-info">
              <Avatar width={40} height={40} image={me.Images[0]} />
              <b>{me.name}</b>
            </div>

            <textarea
              className="modal-form-textarea"
              value={text}
              onChange={onInputText}
              placeholder="🗨️ 텍스트를 입력하세요 🗨️"
            />

            <span className="modal-form-text-length">{text.length}/500</span>

            <Button type="submit" className="modal-create-button" $submit>
              게시
            </Button>
          </form>
        );

      default:
        break;
    }
  }, [
    step,
    imageRef,
    imageSelect,
    imagePreviews,
    setImageNumber,
    uploadImagesLoading,
    onClickRemovePreview,
    removePreviewLoading,
    me,
    text,
    onInputText,
    onSubmitPost,
  ]);

  //2022/01/14 - 다음 스탭 - by 1-blue
  const onClickNextStep = useCallback(() => {
    setStep(prev => prev + 1);

    setTitle("컨텐츠 입력 및 게시글 생성");
  }, [setTitle, setStep]);

  //2022/01/14 - 이전 스탭 - by 1-blue
  const onClickPreviousStep = useCallback(() => {
    setStep(prev => prev - 1);

    if (step === 3) {
      setTitle("이미지 확인 및 수정하기");
    } else if (step === 2) {
      initializePostModal();
    }
  }, [setTitle, setStep, step, initializePostModal]);

  return (
    <Wrapper>
      {/* 모달 닫기 버튼 */}
      <button type="button" className="modal-close-button">
        ❌
      </button>

      <div className="modal" ref={modalRef} onDragOver={e => e.preventDefault()} onDrop={imageDragAndDrop}>
        {/* 다음 스탭으로 넘어가는 버튼 */}
        {step === 2 && (
          <button type="button" className="modal-next-button" onClick={onClickNextStep}>
            다음
          </button>
        )}

        {/* 이전 스탭으로 돌아가는 버튼 */}
        {step !== 1 && (
          <button type="button" className="modal-previous-button" onClick={onClickPreviousStep}>
            이전
          </button>
        )}

        {/* 모달 제목 */}
        <h1 className="modal-head">{title}</h1>

        {/* 모달 컨텐츠 */}
        <div className="modal-body">{contents()}</div>
      </div>
    </Wrapper>
  );
};

CreatePostModal.propTypes = {
  showModal: Proptypes.bool.isRequired,
  onCloseModal: Proptypes.func.isRequired,
};

export default CreatePostModal;
