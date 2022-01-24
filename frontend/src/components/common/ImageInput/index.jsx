/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/24
 * 작성자: 1-blue
 *
 * 이미지 입력받는 input ( 회원가입폼에서 사용 )
 */

import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-component
import { Wrapper } from "./style";

// action
import { uploadImagesAction } from "@store/actions";

const ImageInput = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { imagePreviews } = useSelector(state => state.image);
  const inputRef = useRef(null);

  // 2021/12/20 - 이미지 업로드 ( 파일 탐색기 이용 ) - by 1-blue
  const onChangeProfileImage = useCallback(e => {
    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    dispatch(uploadImagesAction(formData));
  }, []);

  // 2021/12/20 - 이미지 업로드 ( 드래그 앤 드랍 ) - by 1-blue
  const onDragAndDropProfileImage = useCallback(e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("images", e.dataTransfer.files[0]);
    dispatch(uploadImagesAction(formData));
  }, []);

  return (
    <Wrapper
      onClick={() => inputRef.current.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={onDragAndDropProfileImage}
    >
      <input type="file" accept="image/*" onChange={onChangeProfileImage} ref={inputRef} hidden />
      <div>
        {imagePreviews.length > 0 ? (
          <img
            src={process.env.NEXT_PUBLIC_PREVIEW_IMAGE_URL + "/" + imagePreviews[imagePreviews.length - 1]}
            alt="등록할 프로필 이미지"
          />
        ) : (
          <>
            {/* 회원 정보 수정 시 기존 프로필 이미지가 존재하면 보여주기 */}
            {me._id && me.Images[0].name ? (
              <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/" + me.Images[0].name} alt="현재 프로필 이미지" />
            ) : (
              <span>프로필 이미지 선택</span>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ImageInput;
