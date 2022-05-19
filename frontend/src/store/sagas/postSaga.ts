import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import type { AxiosResponse } from "axios";
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LoadPostsResponse,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
  UploadPostResponse,
} from "@src/store/types";

// api
import { apiLoadPosts, apiUploadPost } from "@src/store/api";

function* loadPosts(action: any) {
  try {
    const { data }: AxiosResponse<LoadPostsResponse> = yield call(
      apiLoadPosts,
      action.data
    );

    yield put({ type: LOAD_POSTS_SUCCESS, data });
  } catch (error) {
    console.error("postSaga loadPosts >> ", error);
    yield put({ type: LOAD_POSTS_FAILURE });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* uploadPost(action: any) {
  try {
    const { data }: AxiosResponse<UploadPostResponse> = yield call(
      apiUploadPost,
      action.data
    );

    yield put({ type: UPLOAD_POST_SUCCESS, data });
  } catch (error) {
    console.error("postSaga loadPosts >> ", error);
    yield put({ type: UPLOAD_POST_FAILURE });
  }
}

function* watchuploadPost() {
  yield takeLatest(UPLOAD_POST_REQUEST, uploadPost);
}

export default function* authSaga() {
  yield all([fork(watchLoadPosts), fork(watchuploadPost)]);
}
