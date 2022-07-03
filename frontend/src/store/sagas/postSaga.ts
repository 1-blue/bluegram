import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// action
import { postActions } from "@src/store/reducers";

// types
import type { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  LoadPostsResponse,
  UploadPostResponse,
  LoadDetailPostsResponse,
  RemovePostResponse,
  LoadCommentsResponse,
  AppendCommentResponse,
  RemoveCommentResponse,
  AppendLikeToPostResponse,
  RemoveLikeToPostResponse,
  AppendLikeToCommentResponse,
  RemoveLikeToCommentResponse,
  AppendBookmarkResponse,
  RemoveBookmarkResponse,
  LoadRecommentsResponse,
  LoadPostsOfHashtagResponse,
  LoadPostsOfUserResponse,
  LoadPostsDetailOfUserResponse,
  LoadPostsOfBookmarkResponse,
  LoadPostsBody,
  UploadPostBody,
  RemovePostBody,
  LoadDetailPostsBody,
  LoadPostsOfUserBody,
  LoadPostsDetailOfUserBody,
  LoadPostsOfHashtagBody,
  AppendCommentBody,
  RemoveCommentBody,
  LoadCommentsBody,
  LoadRecommentsBody,
  AppendLikeToPostBody,
  RemoveLikeToPostBody,
  AppendLikeToCommentBody,
  RemoveLikeToCommentBody,
  AppendBookmarkBody,
  RemoveBookmarkBody,
} from "@src/store/types";

// api
import {
  apiLoadPosts,
  apiUploadPost,
  apiLoadDetailPosts,
  apiRemovePost,
  apiLoadComments,
  apiAppendComment,
  apiRemoveComment,
  apiAppendLikeToPost,
  apiRemoveLikeToPost,
  apiAppendLikeToComment,
  apiRemoveLikeToComment,
  apiAppendBookmark,
  apiRemoveBookmark,
  apiLoadPostsOfHashtag,
  apiLoadPostsOfUser,
  apiLoadPostsDetailOfUser,
  apiLoadPostsOfBookmark,
  apiLoadRecomments,
} from "@src/store/api";
import { LoadPostsOfBookmarkBody } from "../types/bookmark";

function* uploadPost(action: PayloadAction<UploadPostBody>) {
  try {
    const { data }: AxiosResponse<UploadPostResponse> = yield call(
      apiUploadPost,
      action.payload
    );

    yield put(postActions.uploadPostSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadPosts >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.uploadPostFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchUploadPost() {
  yield takeLatest(postActions.uploadPostRequest, uploadPost);
}

function* removePost(action: PayloadAction<RemovePostBody>) {
  try {
    const { data }: AxiosResponse<RemovePostResponse> = yield call(
      apiRemovePost,
      action.payload
    );

    yield put(postActions.removePostSuccess(data));
  } catch (error: any) {
    console.error("postSaga RemovePost >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.removePostFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchRemovePost() {
  yield takeLatest(postActions.removePostRequest, removePost);
}

function* loadPosts(action: PayloadAction<LoadPostsBody>) {
  try {
    const { data }: AxiosResponse<LoadPostsResponse> = yield call(
      apiLoadPosts,
      action.payload
    );

    yield put(postActions.loadPostsSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadPosts >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadPostsFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchLoadPosts() {
  yield takeLatest(postActions.loadPostsRequest, loadPosts);
}

function* loadDetailPosts(action: PayloadAction<LoadDetailPostsBody>) {
  try {
    const { data }: AxiosResponse<LoadDetailPostsResponse> = yield call(
      apiLoadDetailPosts,
      action.payload
    );

    yield put(postActions.loadDetailPostsSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadDetailPosts >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadDetailPostsFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLoadDetailPosts() {
  yield takeLatest(postActions.loadDetailPostsRequest, loadDetailPosts);
}

function* loadPostsOfUser(action: PayloadAction<LoadPostsOfUserBody>) {
  try {
    const { data }: AxiosResponse<LoadPostsOfUserResponse> = yield call(
      apiLoadPostsOfUser,
      action.payload
    );

    yield put(postActions.loadPostsOfUserSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadPostsOfUser >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadPostsOfUserFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchloadPostsOfUser() {
  yield takeLatest(postActions.loadPostsOfUserRequest, loadPostsOfUser);
}

function* loadPostsDetailOfUser(
  action: PayloadAction<LoadPostsDetailOfUserBody>
) {
  try {
    const { data }: AxiosResponse<LoadPostsDetailOfUserResponse> = yield call(
      apiLoadPostsDetailOfUser,
      action.payload
    );

    yield put(postActions.loadPostsDetailOfUserSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadPostsDetailOfUser >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadPostsDetailOfUserFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchloadPostsDetailOfUser() {
  yield takeLatest(
    postActions.loadPostsDetailOfUserRequest,
    loadPostsDetailOfUser
  );
}

function* loadPostsOfHashtag(action: PayloadAction<LoadPostsOfHashtagBody>) {
  try {
    const { data }: AxiosResponse<LoadPostsOfHashtagResponse> = yield call(
      apiLoadPostsOfHashtag,
      action.payload
    );

    yield put(postActions.loadPostsOfHashtagSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadPostsOfHashtag >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadPostsOfHashtagFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchloadPostsOfHashtag() {
  yield takeLatest(postActions.loadPostsOfHashtagRequest, loadPostsOfHashtag);
}

function* appendComment(action: PayloadAction<AppendCommentBody>) {
  try {
    const { data }: AxiosResponse<AppendCommentResponse> = yield call(
      apiAppendComment,
      action.payload
    );

    yield put(postActions.appendCommentSuccess(data));
  } catch (error: any) {
    console.error("postSaga appendComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.appendCommentFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchAppendComment() {
  yield takeLatest(postActions.appendCommentRequest, appendComment);
}

function* removeComment(action: PayloadAction<RemoveCommentBody>) {
  try {
    const { data }: AxiosResponse<RemoveCommentResponse> = yield call(
      apiRemoveComment,
      action.payload
    );

    yield put(postActions.removeCommentSuccess(data));
  } catch (error: any) {
    console.error("postSaga removeComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.removeCommentFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchRemoveComment() {
  yield takeLatest(postActions.removeCommentRequest, removeComment);
}

function* loadComments(action: PayloadAction<LoadCommentsBody>) {
  try {
    const { data }: AxiosResponse<LoadCommentsResponse> = yield call(
      apiLoadComments,
      action.payload
    );

    yield put(postActions.loadCommentsSuccess(data));
  } catch (error: any) {
    console.error("postSaga LoadComments >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadCommentsFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLoadComments() {
  yield takeLatest(postActions.loadCommentsRequest, loadComments);
}

function* loadRecomments(action: PayloadAction<LoadRecommentsBody>) {
  try {
    const { data }: AxiosResponse<LoadRecommentsResponse> = yield call(
      apiLoadRecomments,
      action.payload
    );

    yield put(postActions.loadRecommentsSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadRecomments >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadRecommentsFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchLoadRecomments() {
  yield takeLatest(postActions.loadRecommentsRequest, loadRecomments);
}

function* appendLikeToPost(action: PayloadAction<AppendLikeToPostBody>) {
  try {
    const { data }: AxiosResponse<AppendLikeToPostResponse> = yield call(
      apiAppendLikeToPost,
      action.payload
    );

    yield put(postActions.appendLikeToPostSuccess(data));
  } catch (error: any) {
    console.error("postSaga appendLikeToPost >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.appendLikeToPostFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchAppendLikeToPost() {
  yield takeLatest(postActions.appendLikeToPostRequest, appendLikeToPost);
}

function* removeLikeToPost(action: PayloadAction<RemoveLikeToPostBody>) {
  try {
    const { data }: AxiosResponse<RemoveLikeToPostResponse> = yield call(
      apiRemoveLikeToPost,
      action.payload
    );

    yield put(postActions.removeLikeToPostSuccess(data));
  } catch (error: any) {
    console.error("postSaga removeLikeToPost >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.removeLikeToPostFailure({
        status: { ok: true },
        data: { message },
      })
    );
  }
}
function* watchRemoveLikeToPost() {
  yield takeLatest(postActions.removeLikeToPostRequest, removeLikeToPost);
}

function* appendLikeToComment(action: PayloadAction<AppendLikeToCommentBody>) {
  try {
    const { data }: AxiosResponse<AppendLikeToCommentResponse> = yield call(
      apiAppendLikeToComment,
      action.payload
    );

    yield put(postActions.appendLikeToCommentSuccess(data));
  } catch (error: any) {
    console.error("postSaga appendLikeToComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.appendLikeToCommentFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchAppendLikeToComment() {
  yield takeLatest(postActions.appendLikeToCommentRequest, appendLikeToComment);
}

function* removeLikeToComment(action: PayloadAction<RemoveLikeToCommentBody>) {
  try {
    const { data }: AxiosResponse<RemoveLikeToCommentResponse> = yield call(
      apiRemoveLikeToComment,
      action.payload
    );

    yield put(postActions.removeLikeToCommentSuccess(data));
  } catch (error: any) {
    console.error("postSaga removeLikeToComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.removeLikeToCommentFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchRemoveLikeToComment() {
  yield takeLatest(postActions.removeLikeToCommentRequest, removeLikeToComment);
}

function* appendBookmark(action: PayloadAction<AppendBookmarkBody>) {
  try {
    const { data }: AxiosResponse<AppendBookmarkResponse> = yield call(
      apiAppendBookmark,
      action.payload
    );

    yield put(postActions.appendBookmarkSuccess(data));
  } catch (error: any) {
    console.error("postSaga appendBookmark >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.appendBookmarkFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchAppendBookmark() {
  yield takeLatest(postActions.appendBookmarkRequest, appendBookmark);
}

function* removeBookmark(action: PayloadAction<RemoveBookmarkBody>) {
  try {
    const { data }: AxiosResponse<RemoveBookmarkResponse> = yield call(
      apiRemoveBookmark,
      action.payload
    );

    yield put(postActions.removeBookmarkSuccess(data));
  } catch (error: any) {
    console.error("postSaga removeBookmark >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.removeBookmarkFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchRemoveBookmark() {
  yield takeLatest(postActions.removeBookmarkRequest, removeBookmark);
}

function* loadPostsOfBookmark(action: PayloadAction<LoadPostsOfBookmarkBody>) {
  try {
    const { data }: AxiosResponse<LoadPostsOfBookmarkResponse> = yield call(
      apiLoadPostsOfBookmark,
      action.payload
    );

    yield put(postActions.loadPostsOfBookmarkSuccess(data));
  } catch (error: any) {
    console.error("postSaga loadPostsOfBookmark >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      postActions.loadPostsOfBookmarkFailure({
        status: { ok: false },
        data: { message },
      })
    );
  }
}
function* watchloadPostsOfBookmark() {
  yield takeLatest(postActions.loadPostsOfBookmarkRequest, loadPostsOfBookmark);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPost),
    fork(watchLoadDetailPosts),
    fork(watchRemovePost),
    fork(watchLoadComments),
    fork(watchAppendComment),
    fork(watchRemoveComment),
    fork(watchAppendLikeToPost),
    fork(watchRemoveLikeToPost),
    fork(watchAppendLikeToComment),
    fork(watchRemoveLikeToComment),
    fork(watchAppendBookmark),
    fork(watchRemoveBookmark),
    fork(watchLoadRecomments),
    fork(watchloadPostsOfHashtag),
    fork(watchloadPostsOfUser),
    fork(watchloadPostsDetailOfUser),
    fork(watchloadPostsOfBookmark),
  ]);
}
