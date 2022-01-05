/* eslint-disable prettier/prettier */

import { RESET_MESSAGE } from "@store/types";

// 2021/12/20 - 서버 측으로부터 받은 응답 메시지 초기화 - by 1-blue
export const resetMessageAction = () => ({ type: RESET_MESSAGE });

export { localLoginAction, localLogoutAction } from "./authAction";
export { loadToMeAction, signupAction, loadToUserAction, loadToMeDetailAction, editToMeAllAction, editToMePasswordAction, signOutAction } from "./userAction";
export { uploadImagesAction, resetImagePreview } from "./imageAction";
export { resetPostAction, resetPostsAction, createPostAction, loadPostsAction, loadPostAction, removePostAction, loadPostsOfHashtagAction, loadPostsOfUserAction, resetPostsOfUserAction } from "./postAction";
export { appendLikeToPostAction, removeLikeToPostAction, appendLikeToCommentAction, removeLikeToCommentAction } from "./likeAction";
export { appendCommentToPostAction, removeCommentToPostAction, loadRecommentsAction } from "./commentAction";
export { resetFollowAction, loadFollowersAction, loadFollowingsAction, followAction, unfollowAction } from "./followAction";
