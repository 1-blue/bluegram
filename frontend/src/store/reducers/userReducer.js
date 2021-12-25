/* eslint-disable prettier/prettier */

//types
import {
  RESET_MESSAGE,
  LOAD_TO_ME_REQUEST, LOAD_TO_ME_SUCCESS, LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
} from "@store/types";

const initState = {
  // 로그인한 유저의 데이터
  me: null,

  // 로그인한 유저 정보 로드
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,

  // 회원가입
  signupLoading: false,
  signupDone: null,
  signupError: null,
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
        appendLikeToPostDone: false,
        appendLikeToPostDone: null,
        appendLikeToPostError: null,
        removeLikeToPostDone: false,
        removeLikeToPostDone: null,
        removeLikeToPostError: null,
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

    default:
      return prevState;
  }
}

export default userReducer;
