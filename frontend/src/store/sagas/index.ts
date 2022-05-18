import { all, fork } from "redux-saga/effects";

import authSaga from "./authSaga";
import userSaga from "./userSaga";
import postSaga from "./postSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(postSaga)]);
}
