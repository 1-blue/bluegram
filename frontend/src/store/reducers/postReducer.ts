import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  OPEN_WRITE_MODAL,
  CLOSE_WRITE_MODAL,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
} from "@src/store/types";
import type { PostActionRequest } from "../actions";
import { IPostWithPhotoAndCommentAndLikerAndCount } from "@src/type";

type StateType = {
  isShowWritePostModal: boolean;

  posts: IPostWithPhotoAndCommentAndLikerAndCount[] | null;
  hasMorePosts: boolean;

  loadPostsLoading: boolean;
  loadPostsDone: null;
  loadPostsError: null;

  uploadPostLoading: boolean;
  uploadPostDone: null | string;
  uploadPostError: null;
};

const initState: StateType = {
  // 2022/05/19 - 게시글 생성 모달 toggle - by 1-blue
  isShowWritePostModal: false,

  // 2022/05/07 - 모든 게시글들의 정보를 저장할 변수 - by 1-blue
  posts: null,
  // 2022/05/07 - 로드할 게시글이 남아있는지 판단할 변수 - by 1-blue
  hasMorePosts: true,

  // 2022/05/07 - 모든 게시글들 요청 관련 변수 - by 1-blue
  loadPostsLoading: false,
  loadPostsDone: null,
  loadPostsError: null,

  // 2022/05/19 - 게시글 생성 요청 관련 변수 - by 1-blue
  uploadPostLoading: false,
  uploadPostDone: null,
  uploadPostError: null,
};

function postReducer(prevState = initState, action: PostActionRequest) {
  switch (action.type) {
    // 2022/05/19 - 게시글 생성 모달 토글 - by 1-blue
    case OPEN_WRITE_MODAL:
      return {
        ...prevState,
        isShowWritePostModal: true,
      };
    case CLOSE_WRITE_MODAL:
      return {
        ...prevState,
        isShowWritePostModal: false,
      };

    // 2022/05/07 -  - by 1-blue
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

    // 2022/05/19 - 게시글 생성 요청 - by 1-blue
    case UPLOAD_POST_REQUEST:
      return {
        ...prevState,
        uploadPostLoading: true,
        uploadPostDone: null,
        uploadPostError: null,
      };
    case UPLOAD_POST_SUCCESS:
      return {
        ...prevState,
        uploadPostLoading: false,
        uploadPostDone: action.data.message,
        posts: prevState.posts
          ? [action.data.createdPost, ...prevState.posts]
          : [action.data.createdPost],
      };
    case UPLOAD_POST_FAILURE:
      return {
        ...prevState,
        uploadPostLoading: false,
      };

    default:
      return prevState;
  }
}

export default postReducer;
