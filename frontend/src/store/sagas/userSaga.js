/* eslint-disable prettier/prettier */

import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  LOAD_TO_ME_REQUEST, LOAD_TO_ME_SUCCESS, LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  LOAD_TO_USER_REQUEST, LOAD_TO_USER_SUCCESS, LOAD_TO_USER_FAILURE,
 } from "@store/types";

// api
import { apiLoadToMe, apiSignup, apiLoadFollowers, apiLoadFollowings, apiFollow, apiUnfollow, apiLoadToUser } from "@store/api";

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
function* loadFollowers(action) {
  try {
    const { data } = yield call(apiLoadFollowers, action.data);

    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      data: error.response.data,
    });
  }
}
function* loadFollowings(action) {
  try {
    const { data } = yield call(apiLoadFollowings, action.data);

    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      data: error.response.data,
    });
  }
}
function* follow(action) {
  try {
    const { data } = yield call(apiFollow, action.data);

    yield put({
      type: FOLLOW_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FOLLOW_FAILURE,
      data: error.response.data,
    });
  }
}
function* unfollow(action) {
  try {
    const { data } = yield call(apiUnfollow, action.data);

    yield put({
      type: UNFOLLOW_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNFOLLOW_FAILURE,
      data: error.response.data,
    });
  }
}
function* loadToUser(action) {
  try {
    const { data } = yield call(apiLoadToUser, action.data);

    yield put({
      type: LOAD_TO_USER_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_TO_USER_FAILURE,
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
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLoadToUser() {
  yield takeLatest(LOAD_TO_USER_REQUEST, loadToUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadToMe),
    fork(watchSignup),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadToUser),
  ]);
}
