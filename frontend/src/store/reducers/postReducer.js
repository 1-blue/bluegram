/* eslint-disable prettier/prettier */
// 2021/12/22 - 게시글 관련 리듀서 - by 1-blue

//types
import {
  RESET_MESSAGE,
  CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
} from "@store/types";

const initState = {
  // 게시글
  posts: [],

  // 게시글 생성 요청
  createPostLoading: false,
  createPostDone: null,
  createPostError: null,
};

function postReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        createPostLoading: false,
        createPostDone: null,
        createPostError: null,
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
      };
    case CREATE_POST_FAILURE:
      return {
        ...prevState,
        createPostLoading: false,
        createPostError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default postReducer;
