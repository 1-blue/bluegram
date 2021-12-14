// 여러 사가들을 합쳐줌
import { all, fork } from "redux-saga/effects";

import authSaga from "./authSaga";

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
