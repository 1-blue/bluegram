/* eslint-disable prettier/prettier */

import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_POSTS_OF_HASHTAG_REQUEST, LOAD_POSTS_OF_HASHTAG_SUCCESS,  LOAD_POSTS_OF_HASHTAG_FAILURE,
  LOAD_POSTS_OF_USER_REQUEST, LOAD_POSTS_OF_USER_SUCCESS, LOAD_POSTS_OF_USER_FAILURE,
  LOAD_POSTS_DETAIL_REQUEST, LOAD_POSTS_DETAIL_SUCCESS, LOAD_POSTS_DETAIL_FAILURE,
  LOAD_POSTS_DETAIL_OF_USER_REQUEST, LOAD_POSTS_DETAIL_OF_USER_SUCCESS, LOAD_POSTS_DETAIL_OF_USER_FAILURE,
 } from "@store/types";

// api
import { apiLoadPosts, apiLoadPostsOfHashtag, apiLoadPostsOfUser, apiLoadPostsDetail, apiLoadPostsDetailOfUser } from "@store/api";

function* loadPosts(action) {
  try {
    const { data } = yield call(apiLoadPosts, action.data);

    yield put({ type: LOAD_POSTS_SUCCESS, data });
  } catch (error) {
    console.error("postsSaga loadPosts >> ", error);
    yield put({ type: LOAD_POSTS_FAILURE, data: error.response.data });
  }
}
function* loadPostsOfHashtag(action) {
  try {
    const { data } = yield call(apiLoadPostsOfHashtag, action.data);

    yield put({ type: LOAD_POSTS_OF_HASHTAG_SUCCESS, data });
  } catch (error) {
    console.error("postsSaga loadPostsOfHashtag >> ", error);
    yield put({ type: LOAD_POSTS_OF_HASHTAG_FAILURE, data: error.response.data });
  }
}
function* loadPostsOfUser(action) {
  try {
    const { data } = yield call(apiLoadPostsOfUser, action.data);

    yield put({ type: LOAD_POSTS_OF_USER_SUCCESS, data });
  } catch (error) {
    console.error("postsSaga loadPostsOfUser", error);
    yield put({ type: LOAD_POSTS_OF_USER_FAILURE, data: error.response.data });
  }
}
function* loadPostsDetail(action) {
  try {
    const { data } = yield call(apiLoadPostsDetail, action.data);

    yield put({ type: LOAD_POSTS_DETAIL_SUCCESS, data });
  } catch (error) {
    console.error("postsSaga loadPostsDatail >>", error);
    yield put({ type: LOAD_POSTS_DETAIL_FAILURE, data: error.response.data });
  }
}
function* loadPostsDetailOfUser(action) {
  try {
    const { data } = yield call(apiLoadPostsDetailOfUser, action.data);

    yield put({ type: LOAD_POSTS_DETAIL_OF_USER_SUCCESS, data });
  } catch (error) {
    console.error("postsSaga loadPostsDetailOfUser >>", error);
    yield put({ type: LOAD_POSTS_DETAIL_OF_USER_FAILURE, data: error.response.data });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadPostsOfHashtag() {
  yield takeLatest(LOAD_POSTS_OF_HASHTAG_REQUEST, loadPostsOfHashtag);
}
function* watchLoadPostsOfUser() {
  yield takeLatest(LOAD_POSTS_OF_USER_REQUEST, loadPostsOfUser);
}
function* watchLoadPostsDetail() {
  yield takeLatest(LOAD_POSTS_DETAIL_REQUEST, loadPostsDetail);
}
function* watchLoadPostsDetailOfUser() {
  yield takeLatest(LOAD_POSTS_DETAIL_OF_USER_REQUEST, loadPostsDetailOfUser);
}

export default function* postsSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchLoadPostsOfHashtag),
    fork(watchLoadPostsOfUser),
    fork(watchLoadPostsDetail),
    fork(watchLoadPostsDetailOfUser),
  ]);
}
