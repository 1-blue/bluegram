import {
  APPEND_POST_OF_BOOKMARK_REQUEST,
  REMOVE_POST_OF_BOOKMARK_REQUEST,
  LOAD_POSTS_OF_BOOKMARK_REQUEST,
} from "@store/types";

// 2022/01/23 - 북마크 추가 액션 크리에이터 - by 1-blue
export const appendPostOfBookmarkAction = data => ({ type: APPEND_POST_OF_BOOKMARK_REQUEST, data });

// 2022/01/23 - 북마크 제거 액션 크리에이터 - by 1-blue
export const removePostOfBookmarkAction = data => ({ type: REMOVE_POST_OF_BOOKMARK_REQUEST, data });

// 2022/01/23 - 로그인한 유저의 북마크 게시글들 불러오기 액션 크리에이터 - by 1-blue
export const loadPostsOfBookmarkAction = data => ({ type: LOAD_POSTS_OF_BOOKMARK_REQUEST, data });
