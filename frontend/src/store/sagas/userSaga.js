/* eslint-disable prettier/prettier */

import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  LOAD_TO_ME_REQUEST, LOAD_TO_ME_SUCCESS, LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
 } from "@store/types";

// api
import { apiLoadToMe, apiSignup } from "@store/api";

function* loadToMe(action) {
  try {
    const { data } = yield call(apiLoadToMe, action.data);

    yield put({
      type: LOAD_TO_ME_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_TO_ME_FAILURE,
      data: error.response.data,
    });
  }
}
function* signup(action) {
  try {
    const { data } = yield call(apiSignup, action.data);

    yield put({
      type: SIGNUP_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGNUP_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLoadToMe() {
  yield takeLatest(LOAD_TO_ME_REQUEST, loadToMe);
}
function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([fork(watchLoadToMe), fork(watchSignup)]);
}
