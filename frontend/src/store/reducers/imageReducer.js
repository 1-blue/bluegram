/* eslint-disable prettier/prettier */

//types
import {
  RESET_MESSAGE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
} from "@store/types";

const initState = {
  // 유저의 프로필 이미지 프리뷰 or 생성될 게시글 이미지 프리뷰
  imagePreviews: null,

  // 이미지 처리 ( 프로필 및 게시글 )
  uploadImagesLoading: false,
  uploadImagesDone: null,
  uploadImagesError: null,
};

function imageReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        imagePreviews: null,
        
        uploadImagesLoading: false,
        uploadImagesDone: null,
        uploadImagesError: null,

      };

    case UPLOAD_IMAGES_REQUEST:
      return {
        ...prevState,
        uploadImagesLoading: true,
        uploadImagesDone: null,
        uploadImagesError: null,
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...prevState,
        uploadImagesLoading: false,
        uploadImagesDone: action.data.message,
        imagePreviews: action.data.images
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...prevState,
        uploadImagesLoading: false,
        uploadImagesError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default imageReducer;
