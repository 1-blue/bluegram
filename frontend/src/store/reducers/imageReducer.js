//types
import {
  RESET_MESSAGE,
  RESET_IMAGE_PREVIEW,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_PREVIEW_REQUEST,
  REMOVE_PREVIEW_SUCCESS,
  REMOVE_PREVIEW_FAILURE,
} from "@store/types";

const initState = {
  // 유저의 프로필 이미지 프리뷰 or 생성될 게시글 이미지 프리뷰
  imagePreviews: [],

  // 이미지 처리 ( 프로필 및 게시글 )
  uploadImagesLoading: false,
  uploadImagesDone: null,
  uploadImagesError: null,

  // 특정 프리뷰 제거
  removePreviewLoading: false,
  removePreviewDone: null,
  removePreviewError: null,
};

function imageReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        imagePreviews: [],

        uploadImagesLoading: false,
        uploadImagesDone: null,
        uploadImagesError: null,
      };

    case RESET_IMAGE_PREVIEW:
      return {
        ...prevState,
        imagePreviews: [],
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
      console.log("action.data >> ", action.data);
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
