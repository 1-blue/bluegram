/* eslint-disable prettier/prettier */

// types
import {
  RESET_MESSAGE, RESET_POST,
  CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  APPEND_LIKE_TO_POST_REQUEST, APPEND_LIKE_TO_POST_SUCCESS, APPEND_LIKE_TO_POST_FAILURE,
  REMOVE_LIKE_TO_POST_REQUEST, REMOVE_LIKE_TO_POST_SUCCESS, REMOVE_LIKE_TO_POST_FAILURE,
  APPEND_COMMENT_TO_POST_REQUEST, APPEND_COMMENT_TO_POST_SUCCESS, APPEND_COMMENT_TO_POST_FAILURE,
  REMOVE_COMMENT_TO_POST_REQUEST, REMOVE_COMMENT_TO_POST_SUCCESS, REMOVE_COMMENT_TO_POST_FAILURE,
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

  // 특정 게시글 제거 요청
  removePostLoading: false,
  removePostDone: null,
  removePostError: null,

  // 2021/12/25 - 좋아요 추가 - by 1-blue
  appendLikeToPostLoading: false,
  appendLikeToPostDone: null,
  appendLikeToPostError: null,

  // 2021/12/25 - 좋아요 제거 - by 1-blue
  removeLikeToPostLoading: false,
  removeLikeToPostDone: null,
  removeLikeToPostError: null,

  // 2021/12/25 - 게시글에 댓글 추가 - by 1-blue
  appendCommentToPostLoading: false,
  appendCommentToPostDone: null,
  appendCommentToPostError: null,

  // 2021/12/25 - 게시글에 댓글 제거 - by 1-blue
  removeCommentToPostLoading: false,
  removeCommentToPostDone: null,
  removeCommentToPostError: null,
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
        removePostLoading: false,
        removePostDone: null,
        removePostError: null,
        appendLikeToPostLoading: false,
        appendLikeToPostDone: null,
        appendLikeToPostError: null,
        removeLikeToPostLoading: false,
        removeLikeToPostDone: null,
        removeLikeToPostError: null,
        appendCommentToPostLoading: false,
        appendCommentToPostDone: null,
        appendCommentToPostError: null,
        removeCommentToPostLoading: false,
        removeCommentToPostDone: null,
        removeCommentToPostError: null,
      };

    // 2021/12/25 - 특정 게시글 모달창 나갈 때 기존 값 비워주기 - by 1-blue
    case RESET_POST:
      return {
        ...prevState,
        post: null,
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
        posts: [action.data.createdPost, ...prevState.posts],
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

    // 2021/12/28 특정 게시글 제거 - by 1-blue
    case REMOVE_POST_REQUEST:
      return {
        ...prevState,
        removePostLoading: true,
        removePostDone: null,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...prevState,
        removePostLoading: false,
        removePostDone: action.data.message,

        // 2021/12/28 특정 게시글 내용 비우기 - by 1-blue
        posts: prevState.posts.filter(post => post._id !== action.data.result.removedPostId),

        // 2021/12/28 특정 게시글 내용 비우기 - by 1-blue
        post: null,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...prevState,
        removePostLoading: false,
        removePostError: action.data.message,
      };

    // 2021/12/25 - 게시글 좋아요 추가 - by 1-blue
    case APPEND_LIKE_TO_POST_REQUEST:
      return {
        ...prevState,
        appendLikeToPostLoading: true,
        appendLikeToPostDone: null,
        appendLikeToPostError: null,
      };
    case APPEND_LIKE_TO_POST_SUCCESS:
      return {
        ...prevState,
        appendLikeToPostLoading: false,
        appendLikeToPostDone: action.data.message,

        // 2021/12/25 - 불변성 지키면서 게시글 배열에 게시글에 좋아요 누른 인원 추가 - by 1-blue
        posts: prevState.posts.map(post => {
          if (post._id !== action.data.result.PostId) return post;

          return {
            ...post,
            Likers: [...post.Likers, { _id: action.data.result.UserId }],
          };
        }),
        // 2021/12/25 - 불변성 지키면서 특정 게시글 객체에 게시글에 좋아요 누른 인원 추가 - by 1-blue
        post: {
          ...prevState.post,
          Likers: [...prevState.post.Likers, { _id: action.data.result.UserId }],
        },
      };
    case APPEND_LIKE_TO_POST_FAILURE:
      return {
        ...prevState,
        appendLikeToPostLoading: false,
        appendLikeToPostError: action.data.message,
      };

    // 2021/12/25 - 게시글 좋아요 제거 - by 1-blue
    case REMOVE_LIKE_TO_POST_REQUEST:
      return {
        ...prevState,
        removeLikeToPostLoading: true,
        removeLikeToPostDone: null,
        removeLikeToPostError: null,
      };
    case REMOVE_LIKE_TO_POST_SUCCESS:
      return {
        ...prevState,
        removeLikeToPostLoading: false,
        removeLikeToPostDone: action.data.message,

        // 2021/12/25 - 불변성 지키면서 게시글 배열에 게시글에 좋아요 누른 인원 제거 - by 1-blue
        posts: prevState.posts.map(post => {
          if (post._id !== action.data.result.removedPostId) return post;

          return {
            ...post,
            Likers: post.Likers.filter(liker => liker._id !== action.data.result.UserId),
          };
        }),
        // 2021/12/25 - 불변성 지키면서 특정 게시글 객체에 게시글에 좋아요 누른 인원 제거 - by 1-blue
        post: {
          ...prevState.post,
          Likers: prevState.post.Likers.filter(liker => liker._id !== action.data.result.UserId),
        },
      };
    case REMOVE_LIKE_TO_POST_FAILURE:
      return {
        ...prevState,
        removeLikeToPostLoading: false,
        removeLikeToPostError: action.data.message,
      };

    // 2021/12/27 - 게시글 댓글 추가 - by 1-blue
    case APPEND_COMMENT_TO_POST_REQUEST:
      return {
        ...prevState,
        appendCommentToPostLoading: true,
        appendCommentToPostDone: null,
        appendCommentToPostError: null,
      };
    case APPEND_COMMENT_TO_POST_SUCCESS:
      const { createdCommentWithData } = action.data;
      return {
        ...prevState,
        appendCommentToPostLoading: false,
        appendCommentToPostDone: action.data.message,

        // 2021/12/27 - 게시글의 댓글 추가 후 posts 처리 - by 1-blue
        posts: prevState.posts.map(post => {
          if (post._id !== action.data.createdCommentWithData.PostId) return post;

          return {
            ...post,
            Comments: [{ _id: createdCommentWithData._id }, ...post.Comments],
          };
        }),

        // 2021/12/27 - 게시글의 댓글 추가 후 post 처리 - by 1-blue
        post: {
          ...prevState.post,
          Comments: [
            ...prevState.post.Comments,
            {
              _id: createdCommentWithData._id,
              content: createdCommentWithData.content,
              createdAt: createdCommentWithData.createdAt,
              User: { ...createdCommentWithData.User },
            },
          ],
        },
      };
    case APPEND_COMMENT_TO_POST_FAILURE:
      return {
        ...prevState,
        appendCommentToPostLoading: false,
        appendCommentToPostError: action.data.message,
      };

    // 2021/12/27 - 게시글 댓글 삭제 - by 1-blue
    case REMOVE_COMMENT_TO_POST_REQUEST:
      return {
        ...prevState,
        removeCommentToPostLoading: true,
        removeCommentToPostDone: null,
        removeCommentToPostError: null,
      };
    case REMOVE_COMMENT_TO_POST_SUCCESS:
      return {
        ...prevState,
        removeCommentToPostLoading: false,
        removeCommentToPostDone: action.data.message,

        // 2021/12/27 - 게시글의 댓글 삭제 후 posts 처리 - by 1-blue
        posts: prevState.posts.map(post => {
          if (post._id !== action.data.result.removedPostId) return post;

          return {
            ...post,
            Comments: post.Comments.filter(comment => comment._id !== action.data.result.removedCommentId),
          };
        }),

        // 2021/12/27 - 게시글의 댓글 삭제 후 post 처리 - by 1-blue
        post: {
          ...prevState.post,
          Comments: prevState.post.Comments.filter(comment => comment._id !== action.data.result.removedCommentId),
        },
      };
    case REMOVE_COMMENT_TO_POST_FAILURE:
      return {
        ...prevState,
        removeCommentToPostLoading: false,
        removeCommentToPostError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default postReducer;
