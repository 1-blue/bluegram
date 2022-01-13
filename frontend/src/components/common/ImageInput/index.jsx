/**
 * 생성일: 2022/01/13
 * 수정일: -
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
        {imagePreviews ? (
          <img src={process.env.IMAGE_URL + "/" + imagePreviews[0]} alt="회원가입 시 등록할 프로필 이미지" />
        ) : (
          <span>프로필 이미지 선택</span>
        )}
      </div>
    </Wrapper>
  );
};

export default ImageInput;
