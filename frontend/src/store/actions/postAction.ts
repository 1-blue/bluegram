import {
  OPEN_WRITE_MODAL,
  CLOSE_WRITE_MODAL,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LoadPostsBody,
  LoadPostsResponse,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
  UploadPostBody,
  UploadPostResponse,
} from "@src/store/types";

// 2022/05/19 - 게시글 생성 모달 열기/닫기 - by 1-blue
export const openWriteModalRequest = () => ({ type: OPEN_WRITE_MODAL });
export const closeWriteModalRequest = () => ({ type: CLOSE_WRITE_MODAL });

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

// 2022/05/19 - 게시글 생성 요청 액션 크리에이터 - by 1-blue
export const uploadPostRequest = (data: UploadPostBody) => ({
  type: UPLOAD_POST_REQUEST,
  data,
});
export const uploadPostSuccess = (data: UploadPostResponse) => ({
  type: UPLOAD_POST_SUCCESS,
  data,
});
export const uploadPostFailure = () => ({ type: UPLOAD_POST_FAILURE });

export type PostActionRequest =
  | ReturnType<typeof openWriteModalRequest>
  | ReturnType<typeof closeWriteModalRequest>
  | ReturnType<typeof loadPostsRequest>
  | ReturnType<typeof loadPostsSuccess>
  | ReturnType<typeof loadPostsFailure>
  | ReturnType<typeof uploadPostRequest>
  | ReturnType<typeof uploadPostSuccess>
  | ReturnType<typeof uploadPostFailure>;
