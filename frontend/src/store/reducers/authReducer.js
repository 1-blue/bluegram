/* eslint-disable prettier/prettier */

//types
import {
  RESET_MESSAGE,
  LOCAL_LOGIN_REQUEST, LOCAL_LOGIN_SUCCESS, LOCAL_LOGIN_FAILURE,
  LOCAL_LOGOUT_REQUEST, LOCAL_LOGOUT_SUCCESS, LOCAL_LOGOUT_FAILURE,
} from "@store/types";

const initState = {
  // 로그인
  loginLoading: false,
  loginDone: null,
  loginError: null,

  // 로그아웃
  logoutLoading: false,
  logoutDone: null,
  logoutError: null,
};

function authReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        loginLoading: false,
        loginDone: null,
        loginError: null,
        logoutLoading: false,
        logoutDone: null,
        logoutError: null,
      };

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
        logoutError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default authReducer;
