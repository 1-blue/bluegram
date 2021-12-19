/* eslint-disable prettier/prettier */

import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOAD_TO_ME_SUCCESS,
 } from "@store/types";

// api
import { apiLogin } from "@store/api";

function* login(action) {
  try {
    const { data } = yield call(apiLogin, action.data);

    yield put({
      type: LOGIN_SUCCESS,
      data,
    });
    yield put({
      type: LOAD_TO_ME_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOGIN_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* authSaga() {
  yield all([fork(watchLogin)]);
}
