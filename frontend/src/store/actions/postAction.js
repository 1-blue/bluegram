import { CREATE_POST_REQUEST, LOAD_POSTS_REQUEST, LOAD_POST_REQUEST } from "@store/types";

// 2021/12/22 - 게시글 생성 요청 액션 크리에이터 - by 1-blue
export function createPostAction(data) {
  return {
    type: CREATE_POST_REQUEST,
    data,
  };
}

// 2021/12/22 - 최신 게시글들 요청 액션 크리에이터 - by 1-blue
export function loadPostsAction(data) {
  return {
    type: LOAD_POSTS_REQUEST,
    data,
  };
}

// 2021/12/22 - 특정 게시글 요청 액션 크리에이터 - by 1-blue
export function loadPostAction(data) {
  return {
    type: LOAD_POST_REQUEST,
    data,
  };
}
