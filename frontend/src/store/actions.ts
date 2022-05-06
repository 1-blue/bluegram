import {
  LOCAL_LOGIN_FAILURE,
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGOUT_FAILURE,
  LOCAL_LOGOUT_REQUEST,
  LOCAL_LOGOUT_SUCCESS,
  LogInBody,
  LogInResponse,
} from "@src/store/types";

// 2022/05/06 - 로컬 로그인 액션 크리에이터 - by 1-blue
export const localLoginRequest = (data: LogInBody) => ({
  type: LOCAL_LOGIN_REQUEST,
  data,
});
export const localLoginSuccess = (data: LogInResponse) => ({
  type: LOCAL_LOGIN_SUCCESS,
  data,
});
export const localLoginFailure = () => ({ type: LOCAL_LOGIN_FAILURE });

// 2022/05/06 - 로컬 로그아웃 액션 크리에이터 - by 1-blue
export const localLogoutRequest = () => ({ type: LOCAL_LOGOUT_REQUEST });
export const localLogoutSuccess = () => ({ type: LOCAL_LOGOUT_SUCCESS });
export const localLogoutFailure = () => ({ type: LOCAL_LOGOUT_FAILURE });

export type ActionRequest =
  | ReturnType<typeof localLoginRequest>
  | ReturnType<typeof localLoginSuccess>
  | ReturnType<typeof localLoginFailure>
  | ReturnType<typeof localLogoutRequest>
  | ReturnType<typeof localLogoutSuccess>
  | ReturnType<typeof localLogoutFailure>;
