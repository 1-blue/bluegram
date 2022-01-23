import {
  RESET_POSTS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_OF_HASHTAG_REQUEST,
  LOAD_POSTS_OF_USER_REQUEST,
  LOAD_POSTS_DETAIL_REQUEST,
  LOAD_POSTS_DETAIL_OF_USER_REQUEST,
} from "@store/types";

// 2022/01/02 - ExplorePage 들어올 때 게시글들 초기화 액션 크리에이터 - by 1-blue
export const resetPostsAction = data => ({ type: RESET_POSTS, data });

// 2021/12/22 - 최신 게시글들 요청 액션 크리에이터 - by 1-blue
export const loadPostsAction = data => ({ type: LOAD_POSTS_REQUEST, data });

// 2022/01/01 - 특정 해시태그의 게시글들 요청 액션 크리에이터 - by 1-blue
export const loadPostsOfHashtagAction = data => ({ type: LOAD_POSTS_OF_HASHTAG_REQUEST, data });

// 2022/01/04 - 특정 유저의 게시글들 요청 - by 1-blue
export const loadPostsOfUserAction = data => ({ type: LOAD_POSTS_OF_USER_REQUEST, data });

// 2022/01/15 - 게시글들 상세 정보 요청 - by 1-blue
export const loadPostsDetailAction = data => ({ type: LOAD_POSTS_DETAIL_REQUEST, data });

// 2022/01/21 - 특정 유저의 게시글들 상세 정보 요청 - by 1-blue
export const loadPostsDetailOfUserAction = data => ({ type: LOAD_POSTS_DETAIL_OF_USER_REQUEST, data });
