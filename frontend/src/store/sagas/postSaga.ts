import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import type { AxiosError, AxiosResponse } from "axios";
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LoadPostsResponse,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
  UploadPostResponse,
  LOAD_DETAIL_POSTS_REQUEST,
  LOAD_DETAIL_POSTS_SUCCESS,
  LOAD_DETAIL_POSTS_FAILURE,
  LoadDetailPostsResponse,
  RemovePostResponse,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  LoadCommentsResponse,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  AppendCommentResponse,
  APPEND_COMMENT_SUCCESS,
  APPEND_COMMENT_FAILURE,
  APPEND_COMMENT_REQUEST,
  RemoveCommentResponse,
  AppendLikeToPostResponse,
  APPEND_LIKE_TO_POST_SUCCESS,
  APPEND_LIKE_TO_POST_FAILURE,
  APPEND_LIKE_TO_POST_REQUEST,
  RemoveLikeToPostResponse,
  REMOVE_LIKE_TO_POST_SUCCESS,
  REMOVE_LIKE_TO_POST_FAILURE,
  REMOVE_LIKE_TO_POST_REQUEST,
  AppendLikeToCommentResponse,
  APPEND_LIKE_TO_COMMENT_SUCCESS,
  APPEND_LIKE_TO_COMMENT_FAILURE,
  APPEND_LIKE_TO_COMMENT_REQUEST,
  REMOVE_LIKE_TO_COMMENT_SUCCESS,
  REMOVE_LIKE_TO_COMMENT_FAILURE,
  REMOVE_LIKE_TO_COMMENT_REQUEST,
  RemoveLikeToCommentResponse,
  AppendBookmarkResponse,
  APPEND_BOOKMARK_SUCCESS,
  APPEND_BOOKMARK_FAILURE,
  APPEND_BOOKMARK_REQUEST,
  RemoveBookmarkResponse,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAILURE,
  REMOVE_BOOKMARK_REQUEST,
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
} from "@src/store/api";

function* loadPosts(action: any) {
  try {
    const { data }: AxiosResponse<LoadPostsResponse> = yield call(
      apiLoadPosts,
      action.data
    );

    yield put({ type: LOAD_POSTS_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga loadPosts >> ", error);

    yield put({ type: LOAD_POSTS_FAILURE });
  }
}
function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* uploadPost(action: any) {
  try {
    const { data }: AxiosResponse<UploadPostResponse> = yield call(
      apiUploadPost,
      action.data
    );

    yield put({ type: UPLOAD_POST_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga loadPosts >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: UPLOAD_POST_FAILURE, data: { message } });
  }
}
function* watchUploadPost() {
  yield takeLatest(UPLOAD_POST_REQUEST, uploadPost);
}

function* loadDetailPosts(action: any) {
  try {
    const { data }: AxiosResponse<LoadDetailPostsResponse> = yield call(
      apiLoadDetailPosts,
      action.data
    );

    yield put({ type: LOAD_DETAIL_POSTS_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga loadDetailPosts >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: LOAD_DETAIL_POSTS_FAILURE, data: { message } });
  }
}
function* watchLoadDetailPosts() {
  yield takeLatest(LOAD_DETAIL_POSTS_REQUEST, loadDetailPosts);
}

function* removePost(action: any) {
  try {
    const { data }: AxiosResponse<RemovePostResponse> = yield call(
      apiRemovePost,
      action.data
    );

    yield put({ type: REMOVE_POST_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga RemovePost >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: REMOVE_POST_FAILURE, data: { message } });
  }
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* loadComments(action: any) {
  try {
    const { data }: AxiosResponse<LoadCommentsResponse> = yield call(
      apiLoadComments,
      action.data
    );

    yield put({ type: LOAD_COMMENTS_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga LoadComments >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: LOAD_COMMENTS_FAILURE, data: { message } });
  }
}
function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function* appendComment(action: any) {
  try {
    const { data }: AxiosResponse<AppendCommentResponse> = yield call(
      apiAppendComment,
      action.data
    );

    yield put({ type: APPEND_COMMENT_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga appendComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: APPEND_COMMENT_FAILURE, data: { message } });
  }
}
function* watchAppendComment() {
  yield takeLatest(APPEND_COMMENT_REQUEST, appendComment);
}

function* removeComment(action: any) {
  try {
    const { data }: AxiosResponse<RemoveCommentResponse> = yield call(
      apiRemoveComment,
      action.data
    );

    yield put({ type: APPEND_COMMENT_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga removeComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: APPEND_COMMENT_FAILURE, data: { message } });
  }
}
function* watchRemoveComment() {
  yield takeLatest(APPEND_COMMENT_REQUEST, removeComment);
}

function* appendLikeToPost(action: any) {
  try {
    const { data }: AxiosResponse<AppendLikeToPostResponse> = yield call(
      apiAppendLikeToPost,
      action.data
    );

    yield put({ type: APPEND_LIKE_TO_POST_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga appendLikeToPost >> ", error);

    yield put({
      type: APPEND_LIKE_TO_POST_FAILURE,
      data: error?.response?.data,
    });
  }
}
function* watchAppendLikeToPost() {
  yield takeLatest(APPEND_LIKE_TO_POST_REQUEST, appendLikeToPost);
}
function* removeLikeToPost(action: any) {
  try {
    const { data }: AxiosResponse<RemoveLikeToPostResponse> = yield call(
      apiRemoveLikeToPost,
      action.data
    );

    yield put({ type: REMOVE_LIKE_TO_POST_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga removeLikeToPost >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({
      type: REMOVE_LIKE_TO_POST_FAILURE,
      data: {
        message,
      },
    });
  }
}
function* watchRemoveLikeToPost() {
  yield takeLatest(REMOVE_LIKE_TO_POST_REQUEST, removeLikeToPost);
}

function* appendLikeToComment(action: any) {
  try {
    const { data }: AxiosResponse<AppendLikeToCommentResponse> = yield call(
      apiAppendLikeToComment,
      action.data
    );

    yield put({ type: APPEND_LIKE_TO_COMMENT_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga appendLikeToComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: APPEND_LIKE_TO_COMMENT_FAILURE, data: { message } });
  }
}
function* watchAppendLikeToComment() {
  yield takeLatest(APPEND_LIKE_TO_COMMENT_REQUEST, appendLikeToComment);
}
function* removeLikeToComment(action: any) {
  try {
    const { data }: AxiosResponse<RemoveLikeToCommentResponse> = yield call(
      apiRemoveLikeToComment,
      action.data
    );

    yield put({ type: REMOVE_LIKE_TO_COMMENT_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga removeLikeToComment >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: REMOVE_LIKE_TO_COMMENT_FAILURE, data: { message } });
  }
}
function* watchRemoveLikeToComment() {
  yield takeLatest(REMOVE_LIKE_TO_COMMENT_REQUEST, removeLikeToComment);
}

function* appendBookmark(action: any) {
  try {
    const { data }: AxiosResponse<AppendBookmarkResponse> = yield call(
      apiAppendBookmark,
      action.data
    );

    yield put({ type: APPEND_BOOKMARK_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga appendBookmark >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: APPEND_BOOKMARK_FAILURE, data: { message } });
  }
}
function* watchAppendBookmark() {
  yield takeLatest(APPEND_BOOKMARK_REQUEST, appendBookmark);
}
function* removeBookmark(action: any) {
  try {
    const { data }: AxiosResponse<RemoveBookmarkResponse> = yield call(
      apiRemoveBookmark,
      action.data
    );

    yield put({ type: REMOVE_BOOKMARK_SUCCESS, data });
  } catch (error: any) {
    console.error("postSaga removeBookmark >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: REMOVE_BOOKMARK_FAILURE, data: { message } });
  }
}
function* watchRemoveBookmark() {
  yield takeLatest(REMOVE_BOOKMARK_REQUEST, removeBookmark);
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
  ]);
}
