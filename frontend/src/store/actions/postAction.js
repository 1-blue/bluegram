// 2021/12/22 - 게시글 관련 애션 크리에이터 - by 1-blue

import { CREATE_POST_REQUEST } from "@store/types";

// 2021/12/22 - 게시글 생성 요청 액션 크리에이터 - by 1-blue
export function createPostAction(data) {
  return {
    type: CREATE_POST_REQUEST,
    data,
  };
}
