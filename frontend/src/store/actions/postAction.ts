import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LoadPostsBody,
  LoadPostsResponse,
} from "@src/store/types";

// 2022/05/07 - 모든 게시글들 정보 요청 액션 크리에이터 - by 1-blue
export const loadPostsRequest = (data: LoadPostsBody) => ({
  type: LOAD_POSTS_REQUEST,
  data,
});
export const loadPostsSuccess = (data: LoadPostsResponse) => ({
  type: LOAD_POSTS_SUCCESS,
  data,
});
export const loadPostsFailure = () => ({ type: LOAD_POSTS_FAILURE });

export type PostActionRequest =
  | ReturnType<typeof loadPostsRequest>
  | ReturnType<typeof loadPostsSuccess>
  | ReturnType<typeof loadPostsFailure>;
