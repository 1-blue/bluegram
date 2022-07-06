import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  LogInBody,
  LogInResponse,
  LogOutResponse,
  ResponseFailure,
  SignUpBody,
  SignUpResponse,
} from "@src/store/types";

export type AuthStateType = {
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

const initialState: AuthStateType = {
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMessage(state) {
      state.loginDone = null;
      state.loginError = null;
      state.loginLoading = false;
      state.logoutLoading = false;
      state.logoutDone = null;
      state.logoutError = null;
      state.signUpLoading = false;
      state.signUpDone = null;
      state.signUpError = null;
    },
    // 2022/07/02 - 로컬 로그인 - by 1-blue
    localLogInRequest(state, action: PayloadAction<LogInBody>) {
      state.loginLoading = true;
      state.loginDone = null;
      state.loginError = null;
    },
    localLogInSuccess(state, { payload }: PayloadAction<LogInResponse>) {
      state.loginLoading = false;
      state.loginDone = payload.data.message;
    },
    localLogInFailure(state, { payload }: PayloadAction<ResponseFailure>) {
      state.loginLoading = false;
      state.loginError = payload.data.message;
    },
    // 2022/07/02 - 로그아웃 - by 1-blue
    localLogOutRequest(state) {
      state.logoutLoading = true;
      state.logoutDone = null;
      state.logoutError = null;
    },
    localLogOutSuccess(state, { payload }: PayloadAction<LogOutResponse>) {
      state.logoutLoading = false;
      state.logoutDone = payload.data.message;
    },
    localLogOutFailure(state, { payload }: PayloadAction<ResponseFailure>) {
      state.logoutLoading = false;
      state.logoutError = payload.data.message;
    },
    // 2022/07/02 - 회원가입 - by 1-blue
    signUpRequest(state, action: PayloadAction<SignUpBody>) {
      state.signUpLoading = true;
      state.signUpDone = null;
      state.signUpError = null;
    },
    signUpSuccess(state, { payload }: PayloadAction<SignUpResponse>) {
      state.signUpLoading = false;
      state.signUpDone = payload.data.message;
    },
    signUpFailure(state, { payload }: PayloadAction<ResponseFailure>) {
      state.signUpLoading = false;
      state.signUpError = payload.data.message;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
