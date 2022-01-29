import {
  APPEND_LIKE_TO_POST_REQUEST,
  REMOVE_LIKE_TO_POST_REQUEST,
  APPEND_LIKE_TO_COMMENT_REQUEST,
  REMOVE_LIKE_TO_COMMENT_REQUEST,
} from "@store/types";

// 2021/12/25 - 게시글 좋아요 추가 액션 크리에이터 - by 1-blue
export const appendLikeToPostAction = data => ({ type: APPEND_LIKE_TO_POST_REQUEST, data });

// 2021/12/25 - 게시글 좋아요 제거 액션 크리에이터 - by 1-blue
export const removeLikeToPostAction = data => ({ type: REMOVE_LIKE_TO_POST_REQUEST, data });

// 2021/12/28 - 댓글 좋아요 추가 액션 크리에이터 - by 1-blue
export const appendLikeToCommentAction = data => ({ type: APPEND_LIKE_TO_COMMENT_REQUEST, data });

// 2021/12/28 - 댓글 좋아요 제거 액션 크리에이터 - by 1-blue
export const removeLikeToCommentAction = data => ({ type: REMOVE_LIKE_TO_COMMENT_REQUEST, data });
