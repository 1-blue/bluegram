import { APPEND_COMMENT_TO_POST_REQUEST, REMOVE_COMMENT_TO_POST_REQUEST } from "@store/types";

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
