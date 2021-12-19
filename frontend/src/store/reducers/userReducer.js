/* eslint-disable prettier/prettier */

//types
import {
  RESET_MESSAGE,
  LOAD_TO_ME_REQUEST, LOAD_TO_ME_SUCCESS, LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
} from "@store/types";

const initState = {
  // 로그인한 유저의 데이터
  me: null,
  
  // 유저의 프로필 이미지 or 게시글 이미지 preview
  images: null,

  // 로그인한 유저 정보 로드
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,

  // 회원가입
  signupLoading: false,
  signupDone: null,
  signupError: null,

  // 이미지 처리 ( 프로필 및 게시글 )
  uploadImagesLoading: false,
  uploadImagesDone: null,
  uploadImagesError: null,
};

function userReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeDone: null,
        loadToMeError: null,
        signupLoading: false,
        signupDone: null,
        signupError: null,
      };

    case LOAD_TO_ME_REQUEST:
      return {
        ...prevState,
        loadToMeLoading: true,
        loadToMeDone: null,
        loadToMeError: null,
      };
    case LOAD_TO_ME_SUCCESS:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeDone: action.data.message,
        me: action.data.user,
      };
    case LOAD_TO_ME_FAILURE:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeError: action.data.message,
      };

    case SIGNUP_REQUEST:
      return {
        ...prevState,
        signupLoading: true,
        signupDone: null,
        signupError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...prevState,
        signupLoading: false,
        signupDone: action.data.message,
      };
    case SIGNUP_FAILURE:
      return {
        ...prevState,
        signupLoading: false,
        signupError: action.data.message,
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
        images: action.data.images
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

export default userReducer;
