import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_TO_USER_REQUEST,
  LOAD_TO_USER_SUCCESS,
  LOAD_TO_USER_FAILURE,
  LOAD_TO_ME_DETAIL_REQUEST,
  LOAD_TO_ME_DETAIL_SUCCESS,
  LOAD_TO_ME_DETAIL_FAILURE,
  EDIT_TO_ME_ALL_REQUEST,
  EDIT_TO_ME_ALL_SUCCESS,
  EDIT_TO_ME_ALL_FAILURE,
  EDIT_TO_ME_PASSWORD_REQUEST,
  EDIT_TO_ME_PASSWORD_SUCCESS,
  EDIT_TO_ME_PASSWORD_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from "@store/types";

// api
import {
  apiLoadToMe,
  apiSignup,
  apiLoadFollowers,
  apiLoadFollowings,
  apiFollow,
  apiUnfollow,
  apiLoadToUser,
  apiLoadToMeDetail,
  apiEditToMeAll,
  apiEditToMePassword,
  apiSignOut,
} from "@store/api";

function* loadToMe(action) {
  try {
    const { data } = yield call(apiLoadToMe, action.data);

    yield put({ type: LOAD_TO_ME_SUCCESS, data });
  } catch (error) {
    console.error("userSaga loadToMe >> ", error);
    yield put({ type: LOAD_TO_ME_FAILURE, data: error.response.data });
  }
}
function* signup(action) {
  try {
    const { data } = yield call(apiSignup, action.data);

    yield put({ type: SIGNUP_SUCCESS, data });
  } catch (error) {
    console.error("userSaga signup >> ", error);
    yield put({ type: SIGNUP_FAILURE, data: error.response.data });
  }
}
function* loadFollowers(action) {
  try {
    const { data } = yield call(apiLoadFollowers, action.data);

    yield put({ type: LOAD_FOLLOWERS_SUCCESS, data });
  } catch (error) {
    console.error("userSaga loadFollowers >> ", error);
    yield put({ type: LOAD_FOLLOWERS_FAILURE, data: error.response.data });
  }
}
function* loadFollowings(action) {
  try {
    const { data } = yield call(apiLoadFollowings, action.data);

    yield put({ type: LOAD_FOLLOWINGS_SUCCESS, data });
  } catch (error) {
    console.error("userSaga loadFollowings >> ", error);
    yield put({ type: LOAD_FOLLOWINGS_FAILURE, data: error.response.data });
  }
}
function* follow(action) {
  try {
    const { data } = yield call(apiFollow, action.data);

    yield put({ type: FOLLOW_SUCCESS, data });
  } catch (error) {
    console.error("userSaga follow >> ", error);
    yield put({ type: FOLLOW_FAILURE, data: error.response.data });
  }
}
function* unfollow(action) {
  try {
    const { data } = yield call(apiUnfollow, action.data);

    yield put({ type: UNFOLLOW_SUCCESS, data });
  } catch (error) {
    console.error("userSaga unfollow >> ", error);
    yield put({ type: UNFOLLOW_FAILURE, data: error.response.data });
  }
}
function* loadToUser(action) {
  try {
    const { data } = yield call(apiLoadToUser, action.data);

    yield put({ type: LOAD_TO_USER_SUCCESS, data });
  } catch (error) {
    console.error("userSaga loadToUser >> ", error);
    yield put({ type: LOAD_TO_USER_FAILURE, data: error.response.data });
  }
}
function* loadToMeDetail(action) {
  try {
    const { data } = yield call(apiLoadToMeDetail, action.data);

    yield put({ type: LOAD_TO_ME_DETAIL_SUCCESS, data });
  } catch (error) {
    console.error("userSaga loadToMeDatail >> ", error);
    yield put({ type: LOAD_TO_ME_DETAIL_FAILURE, data: error.response.data });
  }
}
function* editToMeAll(action) {
  try {
    const { data } = yield call(apiEditToMeAll, action.data);

    yield put({ type: EDIT_TO_ME_ALL_SUCCESS, data });
  } catch (error) {
    console.error("userSaga editToMeAll >> ", error);
    yield put({ type: EDIT_TO_ME_ALL_FAILURE, data: error.response.data });
  }
}
function* editToMePassword(action) {
  try {
    const { data } = yield call(apiEditToMePassword, action.data);

    yield put({ type: EDIT_TO_ME_PASSWORD_SUCCESS, data });
  } catch (error) {
    console.error("userSaga editToMePassword >> ", error);
    yield put({ type: EDIT_TO_ME_PASSWORD_FAILURE, data: error.response.data });
  }
}
function* signOut(action) {
  try {
    const { data } = yield call(apiSignOut, action.data);

    yield put({ type: SIGN_OUT_SUCCESS, data });
  } catch (error) {
    console.error("userSaga signOut >> ", error);
    yield put({ type: SIGN_OUT_FAILURE, data: error.response.data });
  }
}

function* watchLoadToMe() {
  yield takeLatest(LOAD_TO_ME_REQUEST, loadToMe);
}
function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLoadToUser() {
  yield takeLatest(LOAD_TO_USER_REQUEST, loadToUser);
}
function* watchLoadToMeDetail() {
  yield takeLatest(LOAD_TO_ME_DETAIL_REQUEST, loadToMeDetail);
}
function* watchEditToMeAll() {
  yield takeLatest(EDIT_TO_ME_ALL_REQUEST, editToMeAll);
}
function* watchEditToMePassword() {
  yield takeLatest(EDIT_TO_ME_PASSWORD_REQUEST, editToMePassword);
}
function* watchSignOut() {
  yield takeLatest(SIGN_OUT_REQUEST, signOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadToMe),
    fork(watchSignup),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadToUser),
    fork(watchLoadToMeDetail),
    fork(watchEditToMeAll),
    fork(watchEditToMePassword),
    fork(watchSignOut),
  ]);
}
