import {
  RESET_MESSAGE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  OPEN_WRITE_MODAL,
  CLOSE_WRITE_MODAL,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
  LOAD_DETAIL_POSTS_REQUEST,
  LOAD_DETAIL_POSTS_SUCCESS,
  LOAD_DETAIL_POSTS_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  APPEND_COMMENT_REQUEST,
  APPEND_COMMENT_SUCCESS,
  APPEND_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  APPEND_LIKE_TO_POST_REQUEST,
  APPEND_LIKE_TO_POST_SUCCESS,
  APPEND_LIKE_TO_POST_FAILURE,
  REMOVE_LIKE_TO_POST_REQUEST,
  REMOVE_LIKE_TO_POST_SUCCESS,
  REMOVE_LIKE_TO_POST_FAILURE,
  APPEND_LIKE_TO_COMMENT_REQUEST,
  APPEND_LIKE_TO_COMMENT_SUCCESS,
  APPEND_LIKE_TO_COMMENT_FAILURE,
  REMOVE_LIKE_TO_COMMENT_REQUEST,
  REMOVE_LIKE_TO_COMMENT_SUCCESS,
  REMOVE_LIKE_TO_COMMENT_FAILURE,
  APPEND_BOOKMARK_REQUEST,
  APPEND_BOOKMARK_SUCCESS,
  APPEND_BOOKMARK_FAILURE,
  REMOVE_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAILURE,
  LOAD_RECOMMENTS_REQUEST,
  LOAD_RECOMMENTS_SUCCESS,
  LOAD_RECOMMENTS_FAILURE,
  LOAD_POSTS_OF_HASHTAG_REQUEST,
  LOAD_POSTS_OF_HASHTAG_SUCCESS,
  LOAD_POSTS_OF_HASHTAG_FAILURE,
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
  uploadPostError: null | string;

  detailPosts: IPostWithPhotoAndCommentAndLikerAndCount[] | null;
  hasMoreDeatailPosts: boolean;
  loadDetailPostsLoading: boolean;
  loadDetailPostsDone: null | string;
  loadDetailPostsError: null | string;

  removePostLoading: boolean;
  removePostDone: null | string;
  removePostError: null | string;

  loadCommentsLoading: boolean;
  loadCommentsDone: null | string;
  loadCommentsError: null | string;

  appendCommentLoading: boolean;
  appendCommentDone: null | string;
  appendCommentError: null | string;

  removeCommentLoading: boolean;
  removeCommentDone: null | string;
  removeCommentError: null | string;

  appendLikeToPostLoading: boolean;
  appendLikeToPostDone: null | string;
  appendLikeToPostError: null | string;

  removeLikeToPostLoading: boolean;
  removeLikeToPostDone: null | string;
  removeLikeToPostError: null | string;

  appendLikeToCommentLoading: boolean;
  appendLikeToCommentDone: null | string;
  appendLikeToCommentError: null | string;

  removeLikeToCommentLoading: boolean;
  removeLikeToCommentDone: null | string;
  removeLikeToCommentError: null | string;

  appendBookmarkLoading: boolean;
  appendBookmarkDone: null | string;
  appendBookmarkError: null | string;

  removeBookmarkLoading: boolean;
  removeBookmarkDone: null | string;
  removeBookmarkError: null | string;

  loadRecommentsLoading: boolean;
  loadRecommentsDone: null | string;
  loadRecommentsError: null | string;

  loadPostsOfHashtagLoading: boolean;
  loadPostsOfHashtagDone: null | string;
  loadPostsOfHashtagError: null | string;

  hashtagData: {
    hasMoreHashtagPosts: boolean;
    postsOfHashtagCount: number;
    hashtag: string;
  };
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

  // 2022/05/21 - 게시글 상세 정보를 넣을 변수 - by 1-blue
  detailPosts: null,
  // 2022/05/21 - 로드할 게시글이 남아있는지 판단할 변수 - by 1-blue
  hasMoreDeatailPosts: true,
  // 2022/05/21 - 게시글 상세 정보 요청 관련 변수 - by 1-blue
  loadDetailPostsLoading: false,
  loadDetailPostsDone: null,
  loadDetailPostsError: null,

  // 2022/05/21 - 게시글 제거 요청 관련 변수 - by 1-blue
  removePostLoading: false,
  removePostDone: null,
  removePostError: null,

  // 2022/05/21 - 댓글 로드 요청 관련 변수 - by 1-blue
  loadCommentsLoading: false,
  loadCommentsDone: null,
  loadCommentsError: null,

  // 2022/05/21 - 댓글 추가 제거 요청 관련 변수 - by 1-blue
  appendCommentLoading: false,
  appendCommentDone: null,
  appendCommentError: null,

  // 2022/05/21 - 댓글 제거 제거 요청 관련 변수 - by 1-blue
  removeCommentLoading: false,
  removeCommentDone: null,
  removeCommentError: null,

  // 2022/05/21 - 게시글에 좋아요 추가 요청 관련 변수 - by 1-blue
  appendLikeToPostLoading: false,
  appendLikeToPostDone: null,
  appendLikeToPostError: null,

  // 2022/05/21 - 게시글에 좋아요 제거 요청 관련 변수 - by 1-blue
  removeLikeToPostLoading: false,
  removeLikeToPostDone: null,
  removeLikeToPostError: null,

  // 2022/05/21 - 댓글에 좋아요 추가 요청 관련 변수 - by 1-blue
  appendLikeToCommentLoading: false,
  appendLikeToCommentDone: null,
  appendLikeToCommentError: null,

  // 2022/05/21 - 댓글에 좋아요 제거 요청 관련 변수 - by 1-blue
  removeLikeToCommentLoading: false,
  removeLikeToCommentDone: null,
  removeLikeToCommentError: null,

  // 2022/05/21 - 북마크 추가 요청 관련 변수 - by 1-blue
  appendBookmarkLoading: false,
  appendBookmarkDone: null,
  appendBookmarkError: null,

  // 2022/05/21 - 북마크 제거 요청 관련 변수 - by 1-blue
  removeBookmarkLoading: false,
  removeBookmarkDone: null,
  removeBookmarkError: null,

  // 2022/05/23 - 특정 댓글의 답글 요청 관련 변수 - by 1-blue
  loadRecommentsLoading: false,
  loadRecommentsDone: null,
  loadRecommentsError: null,

  // 2022/05/25 - 특정 해시태그를 포함하는 게시글들 요청 관련 변수 - by 1-blue
  loadPostsOfHashtagLoading: false,
  loadPostsOfHashtagDone: null,
  loadPostsOfHashtagError: null,
  // 2022/05/25 - 해시태그 처리에 필요한 데이터들 - by 1-blue
  hashtagData: {
    hasMoreHashtagPosts: true,
    postsOfHashtagCount: 0,
    hashtag: "",
  },
};

function postReducer(
  prevState: StateType = initState,
  action: PostActionRequest
) {
  let tempDetailPosts:
    | null
    | undefined
    | IPostWithPhotoAndCommentAndLikerAndCount[] = null;

  switch (action.type) {
    // 2022/05/2 - 리셋 메시지 - by 1-blue
    case RESET_MESSAGE:
      return {
        ...prevState,
        loadPostsLoading: false,
        loadPostsDone: null,
        loadPostsError: null,

        uploadPostLoading: false,
        uploadPostDone: null,
        uploadPostError: null,

        loadDetailPostsLoading: false,
        loadDetailPostsDone: null,
        loadDetailPostsError: null,

        removePostLoading: false,
        removePostDone: null,
        removePostError: null,

        loadCommentsLoading: false,
        loadCommentsDone: null,
        loadCommentsError: null,

        appendCommentLoading: false,
        appendCommentDone: null,
        appendCommentError: null,

        removeCommentLoading: false,
        removeCommentDone: null,
        removeCommentError: null,

        appendLikeToPostLoading: false,
        appendLikeToPostDone: null,
        appendLikeToPostError: null,

        removeLikeToPostLoading: false,
        removeLikeToPostDone: null,
        removeLikeToPostError: null,

        appendLikeToCommentLoading: false,
        appendLikeToCommentDone: null,
        appendLikeToCommentError: null,

        removeLikeToCommentLoading: false,
        removeLikeToCommentDone: null,
        removeLikeToCommentError: null,

        appendBookmarkLoading: false,
        appendBookmarkDone: null,
        appendBookmarkError: null,

        removeBookmarkLoading: false,
        removeBookmarkDone: null,
        removeBookmarkError: null,

        loadRecommentsLoading: false,
        loadRecommentsDone: null,
        loadRecommentsError: null,
      };

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

    // 2022/05/07 - 모든 게시글들 정보 - by 1-blue
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
        uploadPostError: action.data.message,
      };

    // 2022/05/21 - 게시글 제거 요청 관련 변수 - by 1-blue
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
        detailPosts: prevState.detailPosts?.filter(
          (post) => post._id !== action.data.removedPostId
        ),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...prevState,
        removePostLoading: false,
        removePostError: action.data.message,
      };

    // 2022/05/21 - 특정 게시글 로드 요청 - by 1-blue
    case LOAD_DETAIL_POSTS_REQUEST:
      return {
        ...prevState,
        loadDetailPostsLoading: true,
        loadDetailPostsDone: null,
        loadDetailPostsError: null,
      };
    case LOAD_DETAIL_POSTS_SUCCESS:
      return {
        ...prevState,
        loadDetailPostsLoading: false,
        loadDetailPostsDone: action.data.message,
        detailPosts: [
          ...(prevState.detailPosts ? prevState.detailPosts : []),
          ...action.data.posts.map((post) => ({
            ...post,
            hasMoreComments: true,
            allCommentCount: post.Comments.length,
          })),
        ],
        hasMoreDeatailPosts: action.data.posts.length === action.data.limit,
      };
    case LOAD_DETAIL_POSTS_FAILURE:
      return {
        ...prevState,
        loadDetailPostsLoading: false,
      };

    // 2022/05/21 - 댓글 로드 요청 관련 변수 - by 1-blue
    case LOAD_COMMENTS_REQUEST:
      return {
        ...prevState,
        loadCommentsLoading: true,
        loadCommentsDone: null,
        loadCommentsError: null,
      };
    case LOAD_COMMENTS_SUCCESS:
      tempDetailPosts = prevState.detailPosts?.map((post) => {
        if (post._id !== action.data.PostId) return post;

        // 2022/01/17 - 이미 댓글을 불러왔다면 - by 1-blue
        if (post.Comments?.[0]?.content) {
          return {
            ...post,
            Comments: [
              ...post.Comments,
              ...action.data.Comments.map((comment) => ({
                ...comment,
                allCommentCount: comment?.Recomments?.length,
                hasMoreComments: true,
              })),
            ],
            hasMoreComments: action.data.limit === action.data.Comments.length,
          };
        }
        // 2022/01/17 - 처음 댓글을 불러온다면 - by 1-blue
        else {
          return {
            ...post,
            Comments: [
              ...action.data.Comments.map((comment) => ({
                ...comment,
                allCommentCount: comment.Recomments.length,
                hasMoreComments: true,
              })),
            ],
            hasMoreComments: action.data.limit === action.data.Comments.length,
          };
        }
      });

      return {
        ...prevState,
        loadCommentsLoading: false,
        loadCommentsDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case LOAD_COMMENTS_FAILURE:
      return {
        ...prevState,
        loadCommentsLoading: false,
        loadCommentsError: action.data.message,
      };

    // 2022/05/21 - 댓글 추가 제거 요청 관련 변수 - by 1-blue
    case APPEND_COMMENT_REQUEST:
      return {
        ...prevState,
        appendCommentLoading: true,
        appendCommentDone: null,
        appendCommentError: null,
      };
    case APPEND_COMMENT_SUCCESS:
      if (!action.data.RecommentId) {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.createdComment.PostId) return post;

          return {
            ...post,
            Comments: [...post.Comments, { ...action.data.createdComment }],
            allCommentCount: post.allCommentCount + 1,
          };
        });
      }
      // 답글 추가일 경우
      else {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.createdComment.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (comment._id !== action.data.RecommentId) return comment;

              return {
                ...comment,
                Recomments: [...comment.Recomments, action.data.createdComment],
                allCommentCount: comment.allCommentCount + 1,
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        appendCommentLoading: false,
        appendCommentDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case APPEND_COMMENT_FAILURE:
      return {
        ...prevState,
        appendCommentLoading: false,
        appendCommentError: action.data.message,
      };

    // 2022/05/21 - 댓글 제거 제거 요청 관련 변수 - by 1-blue
    case REMOVE_COMMENT_REQUEST:
      return {
        ...prevState,
        removeCommentLoading: true,
        removeCommentDone: null,
        removeCommentError: null,
      };
    case REMOVE_COMMENT_SUCCESS:
      if (!action.data.RecommentId) {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.removedPostId) return post;

          return {
            ...post,
            Comments: post.Comments.filter(
              (comment) => comment._id !== action.data.removedCommentId
            ),
            allCommentCount: post.allCommentCount - 1,
          };
        });
      }
      // 답글 삭제
      else {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.removedPostId) return post;

          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (comment._id !== action.data.RecommentId) return comment;

              return {
                ...comment,
                Recomments: comment.Recomments.filter(
                  (recomment) => recomment._id !== action.data.removedCommentId
                ),
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        removeCommentLoading: false,
        removeCommentDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case REMOVE_COMMENT_FAILURE:
      return {
        ...prevState,
        removeCommentLoading: false,
        removeCommentError: action.data.message,
      };

    // 2022/05/21 - 게시글에 좋아요 추가 요청 관련 변수 - by 1-blue
    case APPEND_LIKE_TO_POST_REQUEST:
      return {
        ...prevState,
        appendLikeToPostLoading: true,
        appendLikeToPostDone: null,
        appendLikeToPostError: null,
      };
    case APPEND_LIKE_TO_POST_SUCCESS:
      tempDetailPosts = prevState.detailPosts?.map((post) => {
        if (post._id !== action.data.likedPostId) return post;

        return {
          ...post,
          PostLikers: [
            ...post.PostLikers,
            { _id: action.data.UserId, name: "", Photos: [] },
          ],
        };
      });

      return {
        ...prevState,
        appendLikeToPostLoading: false,
        appendLikeToPostDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case APPEND_LIKE_TO_POST_FAILURE:
      return {
        ...prevState,
        appendLikeToPostLoading: false,
        appendLikeToPostError: action.data.message,
      };

    // 2022/05/21 - 게시글에 좋아요 제거 요청 관련 변수 - by 1-blue
    case REMOVE_LIKE_TO_POST_REQUEST:
      return {
        ...prevState,
        removeLikeToPostLoading: true,
        removeLikeToPostDone: null,
        removeLikeToPostError: null,
      };
    case REMOVE_LIKE_TO_POST_SUCCESS:
      tempDetailPosts = prevState.detailPosts?.map((post) => {
        if (post._id !== action.data.unlikedPostId) return post;

        return {
          ...post,
          PostLikers: post.PostLikers.filter(
            (liker) => liker._id !== action.data.UserId
          ),
        };
      });

      return {
        ...prevState,
        removeLikeToPostLoading: false,
        removeLikeToPostDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case REMOVE_LIKE_TO_POST_FAILURE:
      return {
        ...prevState,
        removeLikeToPostLoading: false,
        removeLikeToPostError: action.data.message,
      };

    // 2022/05/21 - 댓글에 좋아요 추가 요청 관련 변수 - by 1-blue
    case APPEND_LIKE_TO_COMMENT_REQUEST:
      return {
        ...prevState,
        appendLikeToCommentLoading: true,
        appendLikeToCommentDone: null,
        appendLikeToCommentError: null,
      };
    case APPEND_LIKE_TO_COMMENT_SUCCESS:
      if (action.data.RecommentId) {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (comment._id !== action.data.RecommentId) return comment;
              return {
                ...comment,
                Recomments: comment.Recomments.map((recomment) => {
                  if (recomment._id !== action.data.CommentId) return recomment;

                  return {
                    ...recomment,
                    CommentLikers: [
                      ...recomment.CommentLikers,
                      action.data.commentLiker,
                    ],
                  };
                }),
              };
            }),
          };
        });
      }
      // 댓글에 좋아요 누른 경우
      else {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (comment._id !== action.data.CommentId) return comment;

              return {
                ...comment,
                CommentLikers: [
                  ...comment.CommentLikers,
                  action.data.commentLiker,
                ],
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        appendLikeToCommentLoading: false,
        appendLikeToCommentDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case APPEND_LIKE_TO_COMMENT_FAILURE:
      return {
        ...prevState,
        appendLikeToCommentLoading: false,
        appendLikeToCommentError: action.data.message,
      };

    // 2022/05/21 - 댓글에 좋아요 제거 요청 관련 변수 - by 1-blue
    case REMOVE_LIKE_TO_COMMENT_REQUEST:
      return {
        ...prevState,
        removeLikeToCommentLoading: true,
        removeLikeToCommentDone: null,
        removeLikeToCommentError: null,
      };
    case REMOVE_LIKE_TO_COMMENT_SUCCESS:
      // 답글일 경우
      if (action.data.RecommentId) {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (comment._id !== action.data.RecommentId) return comment;

              return {
                ...comment,
                Recomments: comment.Recomments.map((recomment) => {
                  if (recomment._id !== action.data.CommentId) return recomment;

                  return {
                    ...recomment,
                    CommentLikers: comment.CommentLikers.filter(
                      (commentLiker) => commentLiker._id !== action.data.UserId
                    ),
                  };
                }),
              };
            }),
          };
        });
      }
      // 댓글일 경우
      else {
        tempDetailPosts = prevState.detailPosts?.map((post) => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (comment._id !== action.data.CommentId) return comment;

              return {
                ...comment,
                CommentLikers: comment.CommentLikers.filter(
                  (commentLiker) => commentLiker._id !== action.data.UserId
                ),
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        removeLikeToCommentLoading: false,
        removeLikeToCommentDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case REMOVE_LIKE_TO_COMMENT_FAILURE:
      return {
        ...prevState,
        removeLikeToCommentLoading: false,
        removeLikeToCommentError: action.data.message,
      };

    // 2022/05/21 - 북마크 추가 요청 관련 변수 - by 1-blue
    case APPEND_BOOKMARK_REQUEST:
      return {
        ...prevState,
        appendBookmarkLoading: true,
        appendBookmarkDone: null,
        appendBookmarkError: null,
      };
    case APPEND_BOOKMARK_SUCCESS:
      tempDetailPosts = prevState.detailPosts?.map((post) => {
        if (post._id !== action.data.PostId) return post;

        return {
          ...post,
          PostBookmarks: [
            ...post.PostBookmarks,
            { _id: action.data.UserId, name: "임시", Photos: [] },
          ],
        };
      });

      return {
        ...prevState,
        appendBookmarkLoading: false,
        appendBookmarkDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case APPEND_BOOKMARK_FAILURE:
      return {
        ...prevState,
        appendBookmarkLoading: false,
        appendBookmarkError: action.data.message,
      };

    // 2022/05/21 - 북마크 제거 요청 관련 변수 - by 1-blue
    case REMOVE_BOOKMARK_REQUEST:
      return {
        ...prevState,
        removeBookmarkLoading: true,
        removeBookmarkDone: null,
        removeBookmarkError: null,
      };
    case REMOVE_BOOKMARK_SUCCESS:
      tempDetailPosts = prevState.detailPosts?.map((post) => {
        if (post._id !== action.data.PostId) return post;

        return {
          ...post,
          PostBookmarks: post.PostBookmarks.filter(
            (bookmark) => bookmark._id !== action.data.UserId
          ),
        };
      });

      return {
        ...prevState,
        removeBookmarkLoading: false,
        removeBookmarkDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case REMOVE_BOOKMARK_FAILURE:
      return {
        ...prevState,
        removeBookmarkLoading: false,
        removeBookmarkError: action.data.message,
      };

    // 2022/05/21 - 북마크 제거 요청 관련 변수 - by 1-blue
    case REMOVE_BOOKMARK_REQUEST:
      return {
        ...prevState,
        removeBookmarkLoading: true,
        removeBookmarkDone: null,
        removeBookmarkError: null,
      };
    case REMOVE_BOOKMARK_SUCCESS:
      tempDetailPosts = prevState.detailPosts?.map((post) => {
        if (post._id !== action.data.PostId) return post;

        return {
          ...post,
          PostBookmarks: post.PostBookmarks.filter(
            (bookmark) => bookmark._id !== action.data.UserId
          ),
        };
      });

      return {
        ...prevState,
        removeBookmarkLoading: false,
        removeBookmarkDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case REMOVE_BOOKMARK_FAILURE:
      return {
        ...prevState,
        removeBookmarkLoading: false,
        removeBookmarkError: action.data.message,
      };

    // 2022/05/23 - 답글 패치 요청 관련 변수 - by 1-blue
    case LOAD_RECOMMENTS_REQUEST:
      return {
        ...prevState,
        loadRecommentsLoading: false,
        loadRecommentsDone: null,
        loadRecommentsError: null,
      };
    case LOAD_RECOMMENTS_SUCCESS:
      tempDetailPosts = prevState.detailPosts?.map((post) => {
        if (post._id !== action.data.targetPostId) return post;

        return {
          ...post,
          Comments: post.Comments.map((comment) => {
            if (comment._id !== action.data.targetCommentId) return comment;

            // 이전에 답글을 불러온적이 있다면
            if (comment.Recomments[0]?.content) {
              return {
                ...comment,
                Recomments: [...comment.Recomments, ...action.data.Recomments],
                hasMoreComments:
                  action.data.Recomments.length === action.data.limit,
              };
            }
            // 처음 답글을 불러온다면
            else {
              return {
                ...comment,
                Recomments: [...action.data.Recomments],
                hasMoreComments:
                  action.data.Recomments.length === action.data.limit,
              };
            }
          }),
        };
      });

      return {
        ...prevState,
        loadRecommentsLoading: false,
        loadRecommentsDone: action.data.message,
        detailPosts: tempDetailPosts,
      };
    case LOAD_RECOMMENTS_FAILURE:
      return {
        ...prevState,
        loadRecommentsLoading: false,
        loadRecommentsError: action.data.message,
      };

    // 2022/05/25 - 답글 패치 요청 관련 변수 - by 1-blue
    case LOAD_POSTS_OF_HASHTAG_REQUEST:
      return {
        ...prevState,
        loadPostsOfHashtagLoading: false,
        loadPostsOfHashtagDone: null,
        loadPostsOfHashtagError: null,
      };
    case LOAD_POSTS_OF_HASHTAG_SUCCESS:
      if (prevState.hashtagData.hashtag === action.data.hashtag) {
        tempDetailPosts = [
          ...prevState.detailPosts!,
          ...action.data.posts.map((post) => ({
            ...post,
            hasMoreComments: true,
            allCommentCount: post.Comments.length,
          })),
        ];
      } else {
        tempDetailPosts = [
          ...action.data.posts.map((post) => ({
            ...post,
            hasMoreComments: true,
            allCommentCount: post.Comments.length,
          })),
        ];
      }

      return {
        ...prevState,
        loadPostsOfHashtagLoading: false,
        loadPostsOfHashtagDone: action.data.message,
        detailPosts: tempDetailPosts,
        hashtagData: {
          hasMoreHashtagPosts: action.data.posts.length === action.data.limit,
          postsOfHashtagCount: action.data.postCount,
          hashtag: action.data.hashtag,
        },
      };
    case LOAD_POSTS_OF_HASHTAG_FAILURE:
      return {
        ...prevState,
        loadPostsOfHashtagLoading: false,
        loadPostsOfHashtagError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default postReducer;
