import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import { LOAD_TO_ME_REQUEST } from "@store/types";

// api
import { apiLoadToMe } from "@store/api";

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

function* watchLoadToMe() {
  yield takeLatest(LOAD_TO_ME_REQUEST, loadToMe);
}

export default function* authSaga() {
  yield all([fork(watchLoadToMe)]);
}
