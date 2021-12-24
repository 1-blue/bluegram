/* eslint-disable prettier/prettier */

//types
import {
  RESET_MESSAGE,
  CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
} from "@store/types";

const initState = {
  // 최신 게시글들
  posts: [],

  // 특정 게시글
  post: null,

  // 게시글 생성 요청
  createPostLoading: false,
  createPostDone: null,
  createPostError: null,

  // 최신 게시글들 불러오기 요청
  loadPostsLoading: false,
  loadPostsDone: null,
  loadPostsError: null,

  // 특정 게시글 불러오기 요청
  loadPostLoading: false,
  loadPostDone: null,
  loadPostError: null,
};

function postReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        createPostLoading: false,
        createPostDone: null,
        createPostError: null,
        loadPostsLoading: false,
        loadPostsDone: null,
        loadPostsError: null,
        loadPostLoading: false,
        loadPostDone: null,
        loadPostError: null,
      };

    case CREATE_POST_REQUEST:
      return {
        ...prevState,
        createPostLoading: true,
        createPostDone: null,
        createPostError: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...prevState,
        createPostLoading: false,
        createPostDone: action.data.message,
        posts: [action.data.createdPost, ...prevState.posts ]
      };
    case CREATE_POST_FAILURE:
      return {
        ...prevState,
        createPostLoading: false,
        createPostError: action.data.message,
      };

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
        loadPostsDone: action.data.message,
        posts: [...prevState.posts, ...action.data.posts],
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...prevState,
        loadPostsLoading: false,
        loadPostsError: action.data.message,
      };

    case LOAD_POST_REQUEST:
      return {
        ...prevState,
        loadPostLoading: true,
        loadPostDone: null,
        loadPostError: null,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...prevState,
        loadPostLoading: false,
        loadPostDone: action.data.message,
        post: action.data.post,
      };
    case LOAD_POST_FAILURE:
      return {
        ...prevState,
        loadPostLoading: false,
        loadPostError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default postReducer;
