/* eslint-disable prettier/prettier */

import {
  RESET_MESSAGE,
  LOCAL_LOGIN_REQUEST, LOCAL_LOGIN_SUCCESS, LOCAL_LOGIN_FAILURE,
  LOCAL_LOGOUT_REQUEST, LOCAL_LOGOUT_SUCCESS, LOCAL_LOGOUT_FAILURE,
} from "@store/types";

const initState = {
  // 2022/01/15 - 로그인 관련 변수 - by 1-blue
  loginLoading: false,
  loginDone: null,
  loginError: null,

  // 2022/01/15 - 로그아웃 관련 변수 - by 1-blue
  logoutLoading: false,
  logoutDone: null,
  logoutError: null,
};

function authReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        
        loginDone: null,
        loginError: null,

        logoutDone: null,
        logoutError: null,
      };

    // 2022/01/15 - 로그인 - by 1-blue
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

    // 2022/01/15 - 로그아웃 - by 1-blue
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
