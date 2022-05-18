import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import type { AxiosResponse } from "axios";
import {
  LOAD_TO_ME_FAILURE,
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LoadToMeResponse,
} from "@src/store/types";

// api
import { apiLoadToMe } from "@src/store/api";

function* loadToMe() {
  try {
    const { data }: AxiosResponse<LoadToMeResponse> = yield call(apiLoadToMe);

    yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error) {
    console.error("userSaga loadToMe >> ", error);
    yield put({ type: LOAD_TO_ME_FAILURE });
  }
}

function* watchLoadToMe() {
  yield takeLatest(LOAD_TO_ME_REQUEST, loadToMe);
}

export default function* authSaga() {
  yield all([fork(watchLoadToMe)]);
}
