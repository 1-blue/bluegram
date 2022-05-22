import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import type { AxiosResponse } from "axios";
import {
  LOAD_TO_ME_FAILURE,
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LoadToMeResponse,
  FollowResponse,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UnfollowResponse,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
} from "@src/store/types";

// api
import { apiLoadToMe, apiFollow, apiUnfollow } from "@src/store/api";

function* loadToMe() {
  try {
    const { data }: AxiosResponse<LoadToMeResponse> = yield call(apiLoadToMe);

    yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error: any) {
    console.error("userSaga loadToMe >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: LOAD_TO_ME_FAILURE, data: { message } });
  }
}
function* watchLoadToMe() {
  yield takeLatest(LOAD_TO_ME_REQUEST, loadToMe);
}

function* follow(action: any) {
  try {
    const { data }: AxiosResponse<FollowResponse> = yield call(
      apiFollow,
      action.data
    );

    yield put({ type: FOLLOW_SUCCESS, data });
  } catch (error: any) {
    console.error("userSaga follow >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: FOLLOW_FAILURE, data: { message } });
  }
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* unfollow(action: any) {
  try {
    const { data }: AxiosResponse<UnfollowResponse> = yield call(
      apiUnfollow,
      action.data
    );

    yield put({ type: UNFOLLOW_SUCCESS, data });
  } catch (error: any) {
    console.error("userSaga unfollow >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: UNFOLLOW_FAILURE, data: { message } });
  }
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([fork(watchLoadToMe), fork(watchFollow), fork(watchUnfollow)]);
}
