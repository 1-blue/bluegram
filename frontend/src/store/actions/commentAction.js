import {
  APPEND_COMMENT_TO_POST_REQUEST,
  REMOVE_COMMENT_TO_POST_REQUEST,
  LOAD_COMMENTS_REQUEST,
  LOAD_RECOMMENTS_REQUEST,
} from "@store/types";

// 2021/12/27 - 게시글 댓글 추가 액션 크리에이터 - by 1-blue
export const appendCommentToPostAction = data => ({ type: APPEND_COMMENT_TO_POST_REQUEST, data });

// 2021/12/27 - 게시글 댓글 삭제 액션 크리에이터 - by 1-blue
export const removeCommentToPostAction = data => ({ type: REMOVE_COMMENT_TO_POST_REQUEST, data });

// 2022/01/16 - 특정 게시글에 댓글들 요청 액션 크리에이터 - by 1-blue
export const loadCommentsAction = data => ({ type: LOAD_COMMENTS_REQUEST, data });

// 2022/01/16 - 특정 댓글에 답글들 요청 액션 크리에이터 - by 1-blue
export const loadRecommentsAction = data => ({ type: LOAD_RECOMMENTS_REQUEST, data });
