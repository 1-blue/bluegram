import {
  RESET_MESSAGE,
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LOAD_TO_ME_FAILURE,
} from "@src/store/types";
import type { UserActionRequest } from "../actions";
import type { SimpleUser } from "@src/type";

export type UserStateType = {
  me: SimpleUser | null;
  loadToMeLoading: boolean;
  loadToMeDone: null;
  loadToMeError: null;
  logoutLoading: boolean;
  logoutDone: null;
  logoutError: null;
  signUpLoading: boolean;
  signUpDone: null;
  signUpError: null;
};

const initState: UserStateType = {
  // 2022/05/07 - 본인 정보 저장할 변수 - by 1-blue
  me: null,

  // 2022/05/07 - 본인 정보 요청 관련 변수 - by 1-blue
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,
  // 2022/05/18 - 로그아웃 관련 변수 - by 1-blue
  logoutLoading: false,
  logoutDone: null,
  logoutError: null,
  // 2022/05/18 - 회원가입 관련 변수 - by 1-blue
  signUpLoading: false,
  signUpDone: null,
  signUpError: null,
};

function userReducer(prevState = initState, action: UserActionRequest) {
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

    // 2022/05/07 - 본인 정보 요청 - by 1-blue
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
        loadToMeDone: action.data?.message,
        me: action.data?.user,
      };
    case LOAD_TO_ME_FAILURE:
      return {
        ...prevState,
        loadToMeLoading: false,
      };

    default:
      return prevState;
  }
}

export default userReducer;
