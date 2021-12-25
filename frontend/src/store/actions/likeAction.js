import { APPEND_LIKE_TO_POST_REQUEST, REMOVE_LIKE_TO_POST_REQUEST } from "@store/types";

// 2021/12/25 - 게시글 좋아요 추가 액션 크리에이터 - by 1-blue
export function appendLikeToPostAction(data) {
  return {
    type: APPEND_LIKE_TO_POST_REQUEST,
    data,
  };
}

// 2021/12/25 - 게시글 좋아요 제거 액션 크리에이터 - by 1-blue
export function removeLikeToPostAction(data) {
  return {
    type: REMOVE_LIKE_TO_POST_REQUEST,
    data,
  };
}
