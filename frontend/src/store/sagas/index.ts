import { all, fork } from "redux-saga/effects";

import authSaga from "./authSaga";
import userSaga from "./userSaga";
import postSaga from "./postSaga";
import chatSaga from "./chatSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(postSaga), fork(chatSaga)]);
}
