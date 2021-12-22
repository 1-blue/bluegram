/* eslint-disable prettier/prettier */
// 2021/12/22 - 게시글 관련 비동기 요청 처리 - by 1-blue

import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
 } from "@store/types";

// api
import { apiCreatePost } from "@store/api";

function* createPost(action) {
  try {
    const { data } = yield call(apiCreatePost, action.data);

    yield put({
      type: CREATE_POST_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: CREATE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchCreatePost() {
  yield takeLatest(CREATE_POST_REQUEST, createPost);
}

export default function* postSaga() {
  yield all([fork(watchCreatePost)]);
}
