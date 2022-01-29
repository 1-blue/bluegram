// 여러 사가들을 합쳐줌
import { all, fork } from "redux-saga/effects";

import authSaga from "./authSaga";
import userSaga from "./userSaga";
import imageSaga from "./imageSaga";
import postSaga from "./postSaga";
import postsSaga from "./postsSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(imageSaga), fork(postSaga), fork(postsSaga)]);
}
