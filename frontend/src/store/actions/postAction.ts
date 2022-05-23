import {
  OPEN_WRITE_MODAL,
  CLOSE_WRITE_MODAL,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LoadPostsBody,
  LoadPostsResponse,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
  UploadPostBody,
  UploadPostResponse,
  LOAD_DETAIL_POSTS_REQUEST,
  LOAD_DETAIL_POSTS_SUCCESS,
  LOAD_DETAIL_POSTS_FAILURE,
  LoadDetailPostsBody,
  LoadDetailPostsResponse,
  RemovePostBody,
  RemovePostResponse,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LoadCommentsBody,
  LoadCommentsResponse,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  AppendCommentBody,
  AppendCommentResponse,
  APPEND_COMMENT_REQUEST,
  APPEND_COMMENT_SUCCESS,
  APPEND_COMMENT_FAILURE,
  RemoveCommentBody,
  RemoveCommentResponse,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  AppendLikeToPostBody,
  AppendLikeToPostResponse,
  APPEND_LIKE_TO_POST_REQUEST,
  APPEND_LIKE_TO_POST_SUCCESS,
  APPEND_LIKE_TO_POST_FAILURE,
  RemoveLikeToPostBody,
  RemoveLikeToPostResponse,
  REMOVE_LIKE_TO_POST_REQUEST,
  REMOVE_LIKE_TO_POST_SUCCESS,
  REMOVE_LIKE_TO_POST_FAILURE,
  AppendLikeToCommentBody,
  AppendLikeToCommentResponse,
  RemoveLikeToCommentBody,
  RemoveLikeToCommentResponse,
  APPEND_LIKE_TO_COMMENT_REQUEST,
  APPEND_LIKE_TO_COMMENT_SUCCESS,
  APPEND_LIKE_TO_COMMENT_FAILURE,
  REMOVE_LIKE_TO_COMMENT_REQUEST,
  REMOVE_LIKE_TO_COMMENT_SUCCESS,
  REMOVE_LIKE_TO_COMMENT_FAILURE,
  AppendBookmarkBody,
  AppendBookmarkResponse,
  RemoveBookmarkBody,
  RemoveBookmarkResponse,
  APPEND_BOOKMARK_REQUEST,
  APPEND_BOOKMARK_SUCCESS,
  APPEND_BOOKMARK_FAILURE,
  REMOVE_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAILURE,
  FailureResponse,
  LoadRecommentsBody,
  LoadRecommentsResponse,
  LOAD_RECOMMENTS_REQUEST,
  LOAD_RECOMMENTS_SUCCESS,
  LOAD_RECOMMENTS_FAILURE,
} from "@src/store/types";
import { resetMessage } from ".";

// 2022/05/19 - 게시글 생성 모달 열기/닫기 - by 1-blue
export const openWriteModalRequest = () => ({ type: OPEN_WRITE_MODAL });
export const closeWriteModalRequest = () => ({ type: CLOSE_WRITE_MODAL });

// 2022/05/07 - 모든 게시글들 정보 요청 액션 크리에이터 - by 1-blue
export const loadPostsRequest = (data: LoadPostsBody) => ({
  type: LOAD_POSTS_REQUEST,
  data,
});
export const loadPostsSuccess = (data: LoadPostsResponse) => ({
  type: LOAD_POSTS_SUCCESS,
  data,
});
export const loadPostsFailure = (data: FailureResponse) => ({
  type: LOAD_POSTS_FAILURE,
  data,
});

// 2022/05/19 - 게시글 생성 요청 액션 크리에이터 - by 1-blue
export const uploadPostRequest = (data: UploadPostBody) => ({
  type: UPLOAD_POST_REQUEST,
  data,
});
export const uploadPostSuccess = (data: UploadPostResponse) => ({
  type: UPLOAD_POST_SUCCESS,
  data,
});
export const uploadPostFailure = (data: FailureResponse) => ({
  type: UPLOAD_POST_FAILURE,
  data,
});

// 2022/05/21 - 게시글 제거 요청 액션 크리에이터 - by 1-blue
export const loadDetailPostsRequest = (data: LoadDetailPostsBody) => ({
  type: LOAD_DETAIL_POSTS_REQUEST,
  data,
});
export const loadDetailPostsSuccess = (data: LoadDetailPostsResponse) => ({
  type: LOAD_DETAIL_POSTS_SUCCESS,
  data,
});
export const loadDetailPostsFailure = (data: FailureResponse) => ({
  type: LOAD_DETAIL_POSTS_FAILURE,
  data,
});

// 2022/05/21 - 특정 게시글 정보 요청 액션 크리에이터 - by 1-blue
export const removePostRequest = (data: RemovePostBody) => ({
  type: REMOVE_POST_REQUEST,
  data,
});
export const removePostSuccess = (data: RemovePostResponse) => ({
  type: REMOVE_POST_SUCCESS,
  data,
});
export const removePostFailure = (data: FailureResponse) => ({
  type: REMOVE_POST_FAILURE,
  data,
});

// 2022/05/21 - 게시글의 댓글 요청 액션 크리에이터 - by 1-blue
export const loadCommentsRequest = (data: LoadCommentsBody) => ({
  type: LOAD_COMMENTS_REQUEST,
  data,
});
export const loadCommentsSuccess = (data: LoadCommentsResponse) => ({
  type: LOAD_COMMENTS_SUCCESS,
  data,
});
export const loadCommentsFailure = (data: FailureResponse) => ({
  type: LOAD_COMMENTS_FAILURE,
  data,
});

// 2022/05/21 - 게시글의 댓글 추가 요청 액션 크리에이터 - by 1-blue
export const appendCommentRequest = (data: AppendCommentBody) => ({
  type: APPEND_COMMENT_REQUEST,
  data,
});
export const appendCommentSuccess = (data: AppendCommentResponse) => ({
  type: APPEND_COMMENT_SUCCESS,
  data,
});
export const appendCommentFailure = (data: FailureResponse) => ({
  type: APPEND_COMMENT_FAILURE,
  data,
});
// 2022/05/21 - 게시글의 댓글 제거 요청 액션 크리에이터 - by 1-blue
export const removeCommentRequest = (data: RemoveCommentBody) => ({
  type: REMOVE_COMMENT_REQUEST,
  data,
});
export const removeCommentSuccess = (data: RemoveCommentResponse) => ({
  type: REMOVE_COMMENT_SUCCESS,
  data,
});
export const removeCommentFailure = (data: FailureResponse) => ({
  type: REMOVE_COMMENT_FAILURE,
  data,
});

// 2022/05/21 - 게시글에 좋아요 추가 요청 액션 크리에이터 - by 1-blue
export const appendLikeToPostRequest = (data: AppendLikeToPostBody) => ({
  type: APPEND_LIKE_TO_POST_REQUEST,
  data,
});
export const appendLikeToPostSuccess = (data: AppendLikeToPostResponse) => ({
  type: APPEND_LIKE_TO_POST_SUCCESS,
  data,
});
export const appendLikeToPostFailure = (data: FailureResponse) => ({
  type: APPEND_LIKE_TO_POST_FAILURE,
  data,
});
// 2022/05/21 - 게시글에 좋아요 제거 요청 액션 크리에이터 - by 1-blue
export const removeLikeToPostRequest = (data: RemoveLikeToPostBody) => ({
  type: REMOVE_LIKE_TO_POST_REQUEST,
  data,
});
export const removeLikeToPostSuccess = (data: RemoveLikeToPostResponse) => ({
  type: REMOVE_LIKE_TO_POST_SUCCESS,
  data,
});
export const removeLikeToPostFailure = (data: FailureResponse) => ({
  type: REMOVE_LIKE_TO_POST_FAILURE,
  data,
});

// 2022/05/21 - 댓글에 좋아요 추가 요청 액션 크리에이터 - by 1-blue
export const appendLikeToCommentRequest = (data: AppendLikeToCommentBody) => ({
  type: APPEND_LIKE_TO_COMMENT_REQUEST,
  data,
});
export const appendLikeToCommentSuccess = (
  data: AppendLikeToCommentResponse
) => ({
  type: APPEND_LIKE_TO_COMMENT_SUCCESS,
  data,
});
export const appendLikeToCommentFailure = (data: FailureResponse) => ({
  type: APPEND_LIKE_TO_COMMENT_FAILURE,
  data,
});
// 2022/05/21 - 댓글에 좋아요 제거 요청 액션 크리에이터 - by 1-blue
export const removeLikeToCommentRequest = (data: RemoveLikeToCommentBody) => ({
  type: REMOVE_LIKE_TO_COMMENT_REQUEST,
  data,
});
export const removeLikeToCommentSuccess = (
  data: RemoveLikeToCommentResponse
) => ({
  type: REMOVE_LIKE_TO_COMMENT_SUCCESS,
  data,
});
export const removeLikeToCommentFailure = (data: FailureResponse) => ({
  type: REMOVE_LIKE_TO_COMMENT_FAILURE,
  data,
});

// 2022/05/21 - 북마크 추가 요청 액션 크리에이터 - by 1-blue
export const appendBookmarkRequest = (data: AppendBookmarkBody) => ({
  type: APPEND_BOOKMARK_REQUEST,
  data,
});
export const appendBookmarkSuccess = (data: AppendBookmarkResponse) => ({
  type: APPEND_BOOKMARK_SUCCESS,
  data,
});
export const appendBookmarkFailure = (data: FailureResponse) => ({
  type: APPEND_BOOKMARK_FAILURE,
  data,
});
// 2022/05/21 - 북마크 제거 요청 액션 크리에이터 - by 1-blue
export const removeBookmarkRequest = (data: RemoveBookmarkBody) => ({
  type: REMOVE_BOOKMARK_REQUEST,
  data,
});
export const removeBookmarkSuccess = (data: RemoveBookmarkResponse) => ({
  type: REMOVE_BOOKMARK_SUCCESS,
  data,
});
export const removeBookmarkFailure = (data: FailureResponse) => ({
  type: REMOVE_BOOKMARK_FAILURE,
  data,
});

// 2022/05/23 - 특정 댓글의 답글 로드 액션 크리에이터 - by 1-blue
export const loadRecommentsRequest = (data: LoadRecommentsBody) => ({
  type: LOAD_RECOMMENTS_REQUEST,
  data,
});
export const loadRecommentsSuccess = (data: LoadRecommentsResponse) => ({
  type: LOAD_RECOMMENTS_SUCCESS,
  data,
});
export const loadRecommentsFailure = (data: FailureResponse) => ({
  type: LOAD_RECOMMENTS_FAILURE,
  data,
});

export type PostActionRequest =
  | ReturnType<typeof resetMessage>
  | ReturnType<typeof openWriteModalRequest>
  | ReturnType<typeof closeWriteModalRequest>
  | ReturnType<typeof loadPostsRequest>
  | ReturnType<typeof loadPostsSuccess>
  | ReturnType<typeof loadPostsFailure>
  | ReturnType<typeof uploadPostRequest>
  | ReturnType<typeof uploadPostSuccess>
  | ReturnType<typeof uploadPostFailure>
  | ReturnType<typeof loadDetailPostsRequest>
  | ReturnType<typeof loadDetailPostsSuccess>
  | ReturnType<typeof loadDetailPostsFailure>
  | ReturnType<typeof removePostRequest>
  | ReturnType<typeof removePostSuccess>
  | ReturnType<typeof removePostFailure>
  | ReturnType<typeof loadCommentsRequest>
  | ReturnType<typeof loadCommentsSuccess>
  | ReturnType<typeof loadCommentsFailure>
  | ReturnType<typeof appendCommentRequest>
  | ReturnType<typeof appendCommentSuccess>
  | ReturnType<typeof appendCommentFailure>
  | ReturnType<typeof removeCommentRequest>
  | ReturnType<typeof removeCommentSuccess>
  | ReturnType<typeof removeCommentFailure>
  | ReturnType<typeof appendLikeToPostRequest>
  | ReturnType<typeof appendLikeToPostSuccess>
  | ReturnType<typeof appendLikeToPostFailure>
  | ReturnType<typeof removeLikeToPostRequest>
  | ReturnType<typeof removeLikeToPostSuccess>
  | ReturnType<typeof removeLikeToPostFailure>
  | ReturnType<typeof appendLikeToCommentRequest>
  | ReturnType<typeof appendLikeToCommentSuccess>
  | ReturnType<typeof appendLikeToCommentFailure>
  | ReturnType<typeof removeLikeToCommentRequest>
  | ReturnType<typeof removeLikeToCommentSuccess>
  | ReturnType<typeof removeLikeToCommentFailure>
  | ReturnType<typeof appendBookmarkRequest>
  | ReturnType<typeof appendBookmarkSuccess>
  | ReturnType<typeof appendBookmarkFailure>
  | ReturnType<typeof removeBookmarkRequest>
  | ReturnType<typeof removeBookmarkSuccess>
  | ReturnType<typeof removeBookmarkFailure>
  | ReturnType<typeof loadRecommentsRequest>
  | ReturnType<typeof loadRecommentsSuccess>
  | ReturnType<typeof loadRecommentsFailure>;
