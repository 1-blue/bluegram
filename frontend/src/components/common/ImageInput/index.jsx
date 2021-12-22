import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// action
import { uploadImagesAction } from "@store/actions";

// styled-component
import { Wrapper } from "./style";

const ImageInput = () => {
  const dispatch = useDispatch();
  const { imagePreviews } = useSelector(state => state.image);
  const inputRef = useRef(null);

  // 이미지 업로드 ( 파일 탐색기 이용 )
  const onChangeProfileImage = useCallback(e => {
    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    dispatch(uploadImagesAction(formData));
  }, []);

  // 이미지 업로드 ( 드래그 앤 드랍 )
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
      <input type="file" accept="image/*" onChange={onChangeProfileImage} ref={inputRef} />
      <div>
        {imagePreviews ? (
          <img src={`${process.env.IMAGE_URL}/${imagePreviews[0]}`} alt="" />
        ) : (
          <span>프로필 이미지 선택</span>
        )}
      </div>
    </Wrapper>
  );
};

export default ImageInput;
