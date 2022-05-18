import {
  LOCAL_LOGIN_FAILURE,
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGOUT_FAILURE,
  LOCAL_LOGOUT_REQUEST,
  LOCAL_LOGOUT_SUCCESS,
  LogInBody,
  LogInResponse,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SignUpBody,
  SignUpResponse,
  LogOutResponse,
} from "@src/store/types";
import { resetMessage } from ".";

// 2022/05/06 - 로컬 로그인 액션 크리에이터 - by 1-blue
export const localLoginRequest = (data: LogInBody) => ({
  type: LOCAL_LOGIN_REQUEST,
  data,
});
export const localLoginSuccess = (data: LogInResponse) => ({
  type: LOCAL_LOGIN_SUCCESS,
  data,
});
export const localLoginFailure = (message: string) => ({
  type: LOCAL_LOGIN_FAILURE,
  message,
});

// 2022/05/06 - 로컬 로그아웃 액션 크리에이터 - by 1-blue
export const localLogoutRequest = () => ({ type: LOCAL_LOGOUT_REQUEST });
export const localLogoutSuccess = (data: LogOutResponse) => ({
  type: LOCAL_LOGOUT_SUCCESS,
  data,
});
export const localLogoutFailure = () => ({ type: LOCAL_LOGOUT_FAILURE });

// 2022/05/13 - 회원가입 액션 크리에이터 - by 1-blue
export const signUpRequest = (data: SignUpBody) => ({
  type: SIGNUP_REQUEST,
  data,
});
export const signUpSuccess = (data: SignUpResponse) => ({
  type: SIGNUP_SUCCESS,
  data,
});
export const signUpFailure = (data: SignUpResponse) => ({
  type: SIGNUP_FAILURE,
  data,
});

export type AuthActionRequest =
  | ReturnType<typeof resetMessage>
  | ReturnType<typeof localLoginRequest>
  | ReturnType<typeof localLoginSuccess>
  | ReturnType<typeof localLoginFailure>
  | ReturnType<typeof localLogoutRequest>
  | ReturnType<typeof localLogoutSuccess>
  | ReturnType<typeof localLogoutFailure>
  | ReturnType<typeof signUpRequest>
  | ReturnType<typeof signUpSuccess>
  | ReturnType<typeof signUpFailure>;
