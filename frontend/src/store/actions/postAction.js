import {
  OPEN_CREATE_POST_MODAL,
  CLOSE_CREATE_POST_MODAL,
  RESET_POST,
  CREATE_POST_REQUEST,
  LOAD_POST_REQUEST,
  REMOVE_POST_REQUEST,
} from "@store/types";

// 2022/01/14 - 게시글 생성 모달 열기 액션 크리에이터 - by 1-blue
export const openCreatePostModalAction = data => ({ type: OPEN_CREATE_POST_MODAL, data });

// 2022/01/14 - 게시글 생성 모달 닫기 액션 크리에이터 - by 1-blue
export const closeCreatePostModalAction = data => ({ type: CLOSE_CREATE_POST_MODAL, data });

// 2021/12/25 - 특정 게시글 모달창 나갈 때 기존 값 비워주는 액션 크리에이터 - by 1-blue
export const resetPostAction = data => ({ type: RESET_POST, data });

// 2021/12/22 - 게시글 생성 요청 액션 크리에이터 - by 1-blue
export const createPostAction = data => ({ type: CREATE_POST_REQUEST, data });

// 2021/12/22 - 특정 게시글 요청 액션 크리에이터 - by 1-blue
export const loadPostAction = data => ({ type: LOAD_POST_REQUEST, data });

// 2021/12/27 - 특정 게시글 제거 요청 액션 크리에이터 - by 1-blue
export const removePostAction = data => ({ type: REMOVE_POST_REQUEST, data });
