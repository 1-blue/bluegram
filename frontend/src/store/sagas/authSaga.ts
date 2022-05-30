import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import type { AxiosResponse } from "axios";
import {
  LOCAL_LOGIN_FAILURE,
  LOCAL_LOGIN_REQUEST,
  LOCAL_LOGIN_SUCCESS,
  LogInResponse,
  LOCAL_LOGOUT_FAILURE,
  LOCAL_LOGOUT_REQUEST,
  LOCAL_LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SignUpResponse,
  LOAD_TO_ME_SUCCESS,
  LogOutResponse,
} from "@src/store/types";

// api
import { apiLocalLogin, apiLocalLogout, apiSignup } from "@src/store/api";

function* localLogin(action: any) {
  try {
    const { data }: AxiosResponse<LogInResponse> = yield call(
      apiLocalLogin,
      action.data
    );

    yield put({ type: LOCAL_LOGIN_SUCCESS, data });
    yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error: any) {
    console.error("authSaga localLogin >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: LOCAL_LOGIN_FAILURE, data: { message } });
  }
}
function* watchLocalLogin() {
  yield takeLatest(LOCAL_LOGIN_REQUEST, localLogin);
}

function* localLogout() {
  try {
    const { data }: AxiosResponse<LogOutResponse> = yield call(apiLocalLogout);

    yield put({ type: LOCAL_LOGOUT_SUCCESS, data });
    yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error: any) {
    console.error("authSaga localLogout >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: LOCAL_LOGOUT_FAILURE, data: { message } });
  }
}
function* watchLocalLogout() {
  yield takeLatest(LOCAL_LOGOUT_REQUEST, localLogout);
}

function* signup(action: any) {
  try {
    const { data }: AxiosResponse<SignUpResponse> = yield call(
      apiSignup,
      action.data
    );

    yield put({ type: SIGNUP_SUCCESS, data });
  } catch (error: any) {
    console.error("authSaga signup >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: SIGNUP_FAILURE, data: { message } });
  }
}
function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* authSaga() {
  yield all([fork(watchLocalLogin), fork(watchLocalLogout), fork(watchSignup)]);
}
