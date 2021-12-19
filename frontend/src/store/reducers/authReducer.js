/* eslint-disable prettier/prettier */

//types
import {
  RESET_MESSAGE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from "@store/types";

const initState = {
  // 로그인
  loginLoading: false,
  loginDone: null,
  loginError: null,
};

function authReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        loginLoading: false,
        loginDone: null,
        loginError: null,
      };

    case LOGIN_REQUEST:
      return {
        ...prevState,
        loginLoading: true,
        loginDone: null,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        loginLoading: false,
        loginDone: action.data.message,
      };
    case LOGIN_FAILURE:
      return {
        ...prevState,
        loginLoading: false,
        loginError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default authReducer;
