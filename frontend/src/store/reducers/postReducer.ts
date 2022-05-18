import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
} from "@src/store/types";
import type { PostActionRequest } from "../actions";
import { IPostWithPhotoAndCommentAndCount } from "@src/type";

type StateType = {
  posts: IPostWithPhotoAndCommentAndCount[] | null;
  hasMorePosts: boolean;

  loadPostsLoading: boolean;
  loadPostsDone: null;
  loadPostsError: null;
};

const initState: StateType = {
  // 2022/05/07 - 모든 게시글들의 정보를 저장할 변수 - by 1-blue
  posts: null,
  // 2022/05/07 - 로드할 게시글이 남아있는지 판단할 변수 - by 1-blue
  hasMorePosts: true,

  // 2022/05/07 - 모든 게시글들 요청 관련 변수 - by 1-blue
  loadPostsLoading: false,
  loadPostsDone: null,
  loadPostsError: null,
};

function postReducer(prevState = initState, action: PostActionRequest) {
  switch (action.type) {
    // 2022/05/07 - 본인 정보 요청 - by 1-blue
    case LOAD_POSTS_REQUEST:
      return {
        ...prevState,
        loadPostsLoading: true,
        loadPostsDone: null,
        loadPostsError: null,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...prevState,
        loadPostsLoading: false,
        posts: [
          ...(prevState.posts ? prevState.posts : []),
          ...action.data.posts,
        ],
        hasMorePosts: action.data.posts.length === action.data.limit,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...prevState,
        loadPostsLoading: false,
      };

    default:
      return prevState;
  }
}

export default postReducer;
