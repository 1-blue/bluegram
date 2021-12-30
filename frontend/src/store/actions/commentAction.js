import { APPEND_COMMENT_TO_POST_REQUEST, REMOVE_COMMENT_TO_POST_REQUEST, LOAD_RECOMMENTS_REQUEST } from "@store/types";

// 2021/12/27 - 게시글 댓글 추가 액션 크리에이터 - by 1-blue
export function appendCommentToPostAction(data) {
  return {
    type: APPEND_COMMENT_TO_POST_REQUEST,
    data,
  };
}

// 2021/12/27 - 게시글 댓글 삭제 액션 크리에이터 - by 1-blue
export function removeCommentToPostAction(data) {
  return {
    type: REMOVE_COMMENT_TO_POST_REQUEST,
    data,
  };
}

// 2021/12/29 - 특정 댓글에 답글들 요청 액션 크리에이터 - by 1-blue
export function loadRecommentsAction(data) {
  return {
    type: LOAD_RECOMMENTS_REQUEST,
    data,
  };
}
