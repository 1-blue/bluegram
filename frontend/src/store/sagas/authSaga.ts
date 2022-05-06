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
} from "@src/store/types";

// api
import { apiLocalLogin, apiLocalLogout } from "@src/store/api";

function* localLogin(action: any) {
  try {
    const { data }: AxiosResponse<LogInResponse> = yield call(
      apiLocalLogin,
      action.data
    );

    yield put({ type: LOCAL_LOGIN_SUCCESS, data });
    // yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error) {
    console.error("authSaga localLogin >> ", error);
    yield put({ type: LOCAL_LOGIN_FAILURE });
  }
}
function* localLogout() {
  try {
    const { data } = yield call(apiLocalLogout);

    yield put({ type: LOCAL_LOGOUT_SUCCESS, data });
    // yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error) {
    console.error("authSaga localLogout >> ", error);
    yield put({ type: LOCAL_LOGOUT_FAILURE });
  }
}

function* watchLocalLogin() {
  yield takeLatest(LOCAL_LOGIN_REQUEST, localLogin);
}
function* watchLocalLogout() {
  yield takeLatest(LOCAL_LOGOUT_REQUEST, localLogout);
}

export default function* authSaga() {
  yield all([fork(watchLocalLogin), fork(watchLocalLogout)]);
}
