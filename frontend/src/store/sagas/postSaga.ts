import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import type { AxiosResponse } from "axios";
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LoadPostsResponse,
} from "@src/store/types";

// api
import { apiLoadPosts } from "@src/store/api";

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

export default function* authSaga() {
  yield all([fork(watchLoadPosts)]);
}
