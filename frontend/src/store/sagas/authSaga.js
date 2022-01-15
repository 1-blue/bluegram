/* eslint-disable prettier/prettier */

import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  LOAD_TO_ME_SUCCESS,
  LOCAL_LOGIN_REQUEST, LOCAL_LOGIN_SUCCESS, LOCAL_LOGIN_FAILURE,
  LOCAL_LOGOUT_REQUEST, LOCAL_LOGOUT_SUCCESS, LOCAL_LOGOUT_FAILURE,
 } from "@store/types";

// api
import { apiLocalLogin, apiLocalLogout } from "@store/api";

function* localLogin(action) {
  try {
    const { data } = yield call(apiLocalLogin, action.data);

    yield put({ type: LOCAL_LOGIN_SUCCESS, data });
    yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error) {
    console.error("authSaga localLogin >> ", error);
    yield put({ type: LOCAL_LOGIN_FAILURE, data: error.response.data });
  }
}
function* localLogout(action) {
  try {
    const { data } = yield call(apiLocalLogout, action.data);
    data.me = null;

    yield put({ type: LOCAL_LOGOUT_SUCCESS, data });
    yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error) {
    console.error("authSaga localLogout >> ", error);
    yield put({ type: LOCAL_LOGOUT_FAILURE, data: error.response.data });
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
