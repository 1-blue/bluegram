import {
  RESET_MESSAGE,
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAILURE,
  LOCAL_LOGOUT_REQUEST,
  LOCAL_LOGOUT_SUCCESS,
  LOCAL_LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "@src/store/types";
import type { AuthActionRequest } from "../actions";

type StateType = {
  loginLoading: boolean;
  loginDone: null | string;
  loginError: null | string;
  logoutLoading: boolean;
  logoutDone: null | string;
  logoutError: null | string;
  signUpLoading: boolean;
  signUpDone: null | string;
  signUpError: null | string;
};

const initState: StateType = {
  // 2022/05/06 - 로그인 관련 변수 - by 1-blue
  loginLoading: false,
  loginDone: null,
  loginError: null,

  // 2022/05/06 - 로그아웃 관련 변수 - by 1-blue
  logoutLoading: false,
  logoutDone: null,
  logoutError: null,

  // 2022/05/13 - 회원가입 관련 변수 - by 1-blue
  signUpLoading: false,
  signUpDone: null,
  signUpError: null,
};

function authReducer(prevState = initState, action: AuthActionRequest) {
  switch (action.type) {
    // 2022/05/13 - 리셋 메시지 - by 1-blue
    case RESET_MESSAGE:
      return {
        ...prevState,
        loginLoading: false,
        loginDone: null,
        loginError: null,
        logoutLoading: false,
        logoutDone: null,
        logoutError: null,
        signUpLoading: false,
        signUpDone: null,
        signUpError: null,
      };

    // 2022/05/06 - 로그인 - by 1-blue
    case LOCAL_LOGIN_REQUEST:
      return {
        ...prevState,
        loginLoading: true,
        loginDone: null,
        loginError: null,
      };
    case LOCAL_LOGIN_SUCCESS:
      return {
        ...prevState,
        loginLoading: false,
        loginDone: action.data.message,
      };
    case LOCAL_LOGIN_FAILURE:
      return {
        ...prevState,
        loginLoading: false,
        loginError: action.data.message,
      };

    // 2022/05/06 - 로그아웃 - by 1-blue
    case LOCAL_LOGOUT_REQUEST:
      return {
        ...prevState,
        logoutLoading: true,
        logoutDone: null,
        logoutError: null,
      };
    case LOCAL_LOGOUT_SUCCESS:
      return {
        ...prevState,
        logoutLoading: false,
        logoutDone: action.data.message,
      };
    case LOCAL_LOGOUT_FAILURE:
      return {
        ...prevState,
        logoutLoading: false,
      };

    // 2022/05/13 - 회원가입 - by 1-blue
    case SIGNUP_REQUEST:
      return {
        ...prevState,
        signUpLoading: true,
        signUpDone: null,
        signUpError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...prevState,
        signUpLoading: false,
        signUpDone: action.data.message,
      };
    case SIGNUP_FAILURE:
      return {
        ...prevState,
        signUpLoading: false,
        signUpError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default authReducer;
