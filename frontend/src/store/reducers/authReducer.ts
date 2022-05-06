import {
  LOCAL_LOGIN_FAILURE,
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGOUT_FAILURE,
  LOCAL_LOGOUT_REQUEST,
  LOCAL_LOGOUT_SUCCESS,
} from "@src/store/types";
import type { ActionRequest } from "../actions";

type StateType = {
  loginLoading: boolean;
  loginDone: null;
  loginError: null;
  logoutLoading: boolean;
  logoutDone: null;
  logoutError: null;
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
};

function authReducer(prevState = initState, action: ActionRequest) {
  switch (action.type) {
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
      };
    case LOCAL_LOGIN_FAILURE:
      return {
        ...prevState,
        loginLoading: false,
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
      };
    case LOCAL_LOGOUT_FAILURE:
      return {
        ...prevState,
        logoutLoading: false,
      };

    default:
      return prevState;
  }
}

export default authReducer;
