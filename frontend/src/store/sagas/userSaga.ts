import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// action
import { userActions } from "@src/store/reducers";

// types
import type { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  LoadToMeResponse,
  FollowResponse,
  UnfollowResponse,
  LoadToUserResponse,
  LoadFollowersResponse,
  LoadFollowingsResponse,
  LoadToMeDetailResponse,
  EditAccountResponse,
  EditPasswordResponse,
  SignOutResponse,
  LoadToUserBody,
  EditAccountBody,
  EditPasswordBody,
  SignOutBody,
  LoadFollowersBody,
  LoadFollowingsBody,
  FollowBody,
  UnfollowBody,
} from "@src/store/types";

// api
import {
  apiLoadToMe,
  apiFollow,
  apiUnfollow,
  apiLoadToUser,
  apiLoadFollowers,
  apiLoadFollowings,
  apiEditAccount,
  apiEditPassword,
  apiLoadMeDetail,
  apiSignOut,
} from "@src/store/api";

function* loadToMe() {
  try {
    const { data }: AxiosResponse<LoadToMeResponse> = yield call(apiLoadToMe);

    yield put(userActions.loadToMeSuccess(data));
  } catch (error: any) {
    console.error("userSaga loadToMe >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.loadToMeFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchLoadToMe() {
  yield takeLatest(userActions.loadToMeRequest, loadToMe);
}

function* loadToMeDetail() {
  try {
    const { data }: AxiosResponse<LoadToMeDetailResponse> = yield call(
      apiLoadMeDetail
    );

    yield put(userActions.loadToMeDetailSuccess(data));
  } catch (error: any) {
    console.error("userSaga loadMeDetail >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.loadToMeDetailFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLoadToMeDetail() {
  yield takeLatest(userActions.loadToMeDetailRequest, loadToMeDetail);
}

function* loadToUser(action: PayloadAction<LoadToUserBody>) {
  try {
    const { data }: AxiosResponse<LoadToUserResponse> = yield call(
      apiLoadToUser,
      action.payload
    );

    yield put(userActions.loadToUserSuccess(data));
  } catch (error: any) {
    console.error("userSaga loadToUser >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.loadToUserFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLoadToUser() {
  yield takeLatest(userActions.loadToUserRequest, loadToUser);
}

function* editAccount(action: PayloadAction<EditAccountBody>) {
  try {
    const { data }: AxiosResponse<EditAccountResponse> = yield call(
      apiEditAccount,
      action.payload
    );

    yield put(userActions.editAccountSuccess(data));
  } catch (error: any) {
    console.error("userSaga editAccount >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.editAccountFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchEditAccount() {
  yield takeLatest(userActions.editAccountRequest, editAccount);
}

function* editPassword(action: PayloadAction<EditPasswordBody>) {
  try {
    const { data }: AxiosResponse<EditPasswordResponse> = yield call(
      apiEditPassword,
      action.payload
    );

    yield put(userActions.editPasswordSuccess(data));
  } catch (error: any) {
    console.error("userSaga editPassword >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.editAccountFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchEditPassword() {
  yield takeLatest(userActions.editPasswordRequest, editPassword);
}

function* signOut(action: PayloadAction<SignOutBody>) {
  try {
    const { data }: AxiosResponse<SignOutResponse> = yield call(
      apiSignOut,
      action.payload
    );

    yield put(userActions.signOutSuccess(data));
  } catch (error: any) {
    console.error("userSaga signOut >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.signOutFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchSignOut() {
  yield takeLatest(userActions.signOutRequest, signOut);
}

function* loadFollowers(action: PayloadAction<LoadFollowersBody>) {
  try {
    const { data }: AxiosResponse<LoadFollowersResponse> = yield call(
      apiLoadFollowers,
      action.payload
    );

    yield put(userActions.loadFollowersSuccess(data));
  } catch (error: any) {
    console.error("userSaga loadFollowers >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.loadFollowersFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLoadFollowers() {
  yield takeLatest(userActions.loadFollowersRequest, loadFollowers);
}

function* loadFollowings(action: PayloadAction<LoadFollowingsBody>) {
  try {
    const { data }: AxiosResponse<LoadFollowingsResponse> = yield call(
      apiLoadFollowings,
      action.payload
    );

    yield put(userActions.loadFollowingsSuccess(data));
  } catch (error: any) {
    console.error("userSaga loadFollowings >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.loadFollowingsFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLoadFollowings() {
  yield takeLatest(userActions.loadFollowingsRequest, loadFollowings);
}

function* follow(action: PayloadAction<FollowBody>) {
  try {
    const { data }: AxiosResponse<FollowResponse> = yield call(
      apiFollow,
      action.payload
    );

    yield put(userActions.followSuccess(data));
  } catch (error: any) {
    console.error("userSaga follow >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.followFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchFollow() {
  yield takeLatest(userActions.followRequest, follow);
}

function* unfollow(action: PayloadAction<UnfollowBody>) {
  try {
    const { data }: AxiosResponse<UnfollowResponse> = yield call(
      apiUnfollow,
      action.payload
    );

    yield put(userActions.unfollowSuccess(data));
  } catch (error: any) {
    console.error("userSaga unfollow >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      userActions.unfollowFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchUnfollow() {
  yield takeLatest(userActions.unfollowRequest, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadToMe),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadToUser),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchLoadToMeDetail),
    fork(watchEditAccount),
    fork(watchEditPassword),
    fork(watchSignOut),
  ]);
}
