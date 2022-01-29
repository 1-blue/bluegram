/* eslint-disable prettier/prettier */

import {
  RESET_MESSAGE,
  RESET_IMAGE_PREVIEW,
  
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  REMOVE_PREVIEW_REQUEST, REMOVE_PREVIEW_SUCCESS, REMOVE_PREVIEW_FAILURE,
} from "@store/types";

const initState = {
  // 2022/01/15 - 유저의 프로필 이미지 프리뷰 or 생성될 게시글 이미지 프리뷰 - by 1-blue
  imagePreviews: [],

  // 2022/01/15 - 이미지 처리 관련 요청 변수 - by 1-blue
  uploadImagesLoading: false,
  uploadImagesDone: null,
  uploadImagesError: null,

  // 2022/01/15 - 게시글 생성 시 이미지 프리뷰 제거 관련 변수 - by 1-blue
  removePreviewLoading: false,
  removePreviewDone: null,
  removePreviewError: null,
};

function imageReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,

        uploadImagesDone: null,
        uploadImagesError: null,

        removePreviewDone: null,
        removePreviewError: null,
      };

    // 2022/01/15 - 프리뷰 비우기 - by 1-blue
    case RESET_IMAGE_PREVIEW:
      return {
        ...prevState,
        imagePreviews: [],
      };

    // 2022/01/15 - 이미지 업로드 - by 1-blue
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
        imagePreviews: [...prevState.imagePreviews, ...action.data.images],
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...prevState,
        uploadImagesLoading: false,
        uploadImagesError: action.data.message,
      };

    // 2022/01/14 - 특정 프리뷰 제거 - by 1-blue
    case REMOVE_PREVIEW_REQUEST:
      return {
        ...prevState,
        removePreviewLoading: true,
        removePreviewDone: null,
        removePreviewError: null,
      };
    case REMOVE_PREVIEW_SUCCESS:
      return {
        ...prevState,
        removePreviewLoading: false,
        removePreviewDone: action.data.message,
        imagePreviews: prevState.imagePreviews.filter(preview => preview !== action.data.preview),
      };
    case REMOVE_PREVIEW_FAILURE:
      return {
        ...prevState,
        removePreviewLoading: false,
        removePreviewError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default imageReducer;
