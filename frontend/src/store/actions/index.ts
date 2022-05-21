import { RESET_MESSAGE } from "../types";

export const resetMessage = () => ({
  type: RESET_MESSAGE,
});

export {
  localLoginRequest,
  localLoginSuccess,
  localLoginFailure,
  localLogoutRequest,
  localLogoutSuccess,
  localLogoutFailure,
} from "./authAction";
export type { AuthActionRequest } from "./authAction";

export {
  loadToMeRequest,
  loadToMeSuccess,
  loadToMeFailure,
  followFailure,
  followRequest,
  followSuccess,
  unfollowFailure,
  unfollowRequest,
  unfollowSuccess,
} from "./userAction";
export type { UserActionRequest } from "./userAction";

export {
  appendBookmarkFailure,
  appendBookmarkRequest,
  appendBookmarkSuccess,
  appendCommentFailure,
  appendCommentRequest,
  appendCommentSuccess,
  appendLikeToCommentFailure,
  appendLikeToCommentRequest,
  appendLikeToCommentSuccess,
  appendLikeToPostFailure,
  appendLikeToPostRequest,
  appendLikeToPostSuccess,
  closeWriteModalRequest,
  loadCommentsFailure,
  loadCommentsRequest,
  loadCommentsSuccess,
  loadDetailPostsFailure,
  loadDetailPostsRequest,
  loadDetailPostsSuccess,
  loadPostsFailure,
  loadPostsRequest,
  loadPostsSuccess,
  openWriteModalRequest,
  removeBookmarkFailure,
  removeBookmarkRequest,
  removeBookmarkSuccess,
  removeCommentFailure,
  removeCommentRequest,
  removeCommentSuccess,
  removeLikeToCommentFailure,
  removeLikeToCommentRequest,
  removeLikeToCommentSuccess,
  removeLikeToPostFailure,
  removeLikeToPostRequest,
  removeLikeToPostSuccess,
  removePostFailure,
  removePostRequest,
  removePostSuccess,
  uploadPostFailure,
  uploadPostRequest,
  uploadPostSuccess,
} from "./postAction";
export type { PostActionRequest } from "./postAction";
