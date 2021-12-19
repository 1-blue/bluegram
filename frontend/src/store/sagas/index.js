// 여러 사가들을 합쳐줌
import { all, fork } from "redux-saga/effects";

import authSaga from "./authSaga";
import userSaga from "./userSaga";
import imageSaga from "./imageSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(imageSaga)]);
}
