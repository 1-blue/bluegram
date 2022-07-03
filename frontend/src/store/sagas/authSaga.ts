import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// action
import { authActions, userActions } from "../reducers";

// types
import type { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  LogInResponse,
  SignUpResponse,
  LogOutResponse,
  LogInBody,
  SignUpBody,
} from "@src/store/types";

// api
import { apiLocalLogin, apiLocalLogout, apiSignup } from "@src/store/api";

function* localLogIn(action: PayloadAction<LogInBody>) {
  try {
    const { data }: AxiosResponse<LogInResponse> = yield call(
      apiLocalLogin,
      action.payload
    );

    yield put(authActions.localLogInSuccess(data));
    yield put(userActions.loadToMeSuccess(data));
  } catch (error: any) {
    console.error("authSaga localLogIn >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      authActions.localLogInFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchlocalLogIn() {
  yield takeLatest(authActions.localLogInRequest, localLogIn);
}

function* localLogout() {
  try {
    const { data }: AxiosResponse<LogOutResponse> = yield call(apiLocalLogout);

    yield put(authActions.localLogOutSuccess(data));
    yield put(
      userActions.loadToMeSuccess({
        ...data,
        data: { ...data.data, user: null },
      })
    );
  } catch (error: any) {
    console.error("authSaga localLogout >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      authActions.localLogOutFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLocalLogout() {
  yield takeLatest(authActions.localLogOutRequest, localLogout);
}

function* signUp(action: PayloadAction<SignUpBody>) {
  try {
    const { data }: AxiosResponse<SignUpResponse> = yield call(
      apiSignup,
      action.payload
    );

    yield put(authActions.signUpSuccess(data));
  } catch (error: any) {
    console.error("authSaga signup >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      authActions.signUpFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchSignUp() {
  yield takeLatest(authActions.signUpRequest, signUp);
}

export default function* authSaga() {
  yield all([fork(watchlocalLogIn), fork(watchLocalLogout), fork(watchSignUp)]);
}
