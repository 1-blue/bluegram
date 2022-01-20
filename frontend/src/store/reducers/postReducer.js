/* eslint-disable prettier/prettier */

import {
  RESET_MESSAGE,
  OPEN_CREATE_POST_MODAL,
  CLOSE_CREATE_POST_MODAL,
  RESET_POST,
  RESET_POSTS,
  RESET_POSTS_OF_USER,
  
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  LOAD_POSTS_OF_HASHTAG_REQUEST, LOAD_POSTS_OF_HASHTAG_SUCCESS, LOAD_POSTS_OF_HASHTAG_FAILURE,
  LOAD_POSTS_OF_USER_REQUEST, LOAD_POSTS_OF_USER_SUCCESS, LOAD_POSTS_OF_USER_FAILURE,
  LOAD_POSTS_DETAIL_REQUEST, LOAD_POSTS_DETAIL_SUCCESS, LOAD_POSTS_DETAIL_FAILURE,
  CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  APPEND_LIKE_TO_POST_REQUEST, APPEND_LIKE_TO_POST_SUCCESS, APPEND_LIKE_TO_POST_FAILURE,
  REMOVE_LIKE_TO_POST_REQUEST, REMOVE_LIKE_TO_POST_SUCCESS, REMOVE_LIKE_TO_POST_FAILURE,
  APPEND_COMMENT_TO_POST_REQUEST, APPEND_COMMENT_TO_POST_SUCCESS, APPEND_COMMENT_TO_POST_FAILURE,
  REMOVE_COMMENT_TO_POST_REQUEST, REMOVE_COMMENT_TO_POST_SUCCESS, REMOVE_COMMENT_TO_POST_FAILURE,
  APPEND_LIKE_TO_COMMENT_REQUEST, APPEND_LIKE_TO_COMMENT_SUCCESS, APPEND_LIKE_TO_COMMENT_FAILURE,
  REMOVE_LIKE_TO_COMMENT_REQUEST, REMOVE_LIKE_TO_COMMENT_SUCCESS, REMOVE_LIKE_TO_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
  LOAD_RECOMMENTS_REQUEST, LOAD_RECOMMENTS_SUCCESS, LOAD_RECOMMENTS_FAILURE,
} from "@store/types";

const initState = {
  // 2022/01/15 - 게시글 생성 모달창 open/close 변수 - by 1-blue
  showCreatePostModal: false,

  // 2022/01/15 - HomePage에서 보여줄 게시글들을 넣을 변수 ( 최소한의 정보만 넣음 ) - by 1-blue
  posts: [],

  // 2022/01/15 - ExplorePage, HashtagPage에서 보여줄 게시글들을 넣을 변수 ( 게시글의 모든 정보를 넣음 ) - by 1-blue
  postsOfDetail: [],

  // 2022/01/15 - 특정 게시글 정보를 넣을 변수 - by 1-blue
  post: null,

  // 2022/01/15 - 해시태그 게시글들을 보여줄 때 필요한 데이터 모음 - by 1-blue
  postsOfHashtagMetadata: {
    hasMoreHashtagPosts: true,
    postsOfHashtagCount: 0,
    hashtagText: "",
  },

  // 2022/01/15 - 특정 유저의 게시글들을 넣을 변수 - by 1-blue
  postsOfUser: [],

  // 2022/01/15 - 게시글들을 추가로 요청할지 결정하는 변수 - by 1-blue
  isMorePosts: true,
  isMorePostsOfDetail: true,
  isMorePostsOfUser: true,

  // 2022/01/15 - HomePage게시글들 불러오기 관련 변수 - by 1-blue
  loadPostsLoading: false,
  loadPostsDone: null,
  loadPostsError: null,

  // 2022/01/15 - 특정 게시글 불러오기 관련 변수 - by 1-blue
  loadPostLoading: false,
  loadPostDone: null,
  loadPostError: null,

  // 2022/01/15 - 해시태그에 해당하는 게시글들 요청 관련 변수 - by 1-blue
  loadPostsOfHashtagLoading: false,
  loadPostsOfHashtagDone: null,
  loadPostsOfHashtagError: null,

  // 2022/01/15 - 특정 유저의 게시글들 요청 관련 변수 - by 1-blue
  loadPostsOfUserLoading: false,
  loadPostsOfUserDone: null,
  loadPostsOfUserError: null,

  // 2022/01/15 - ExplorePage게시글들 상세 정보 요청 변수 - by 1-blue
  loadPostsOfDetailLoading: false,
  loadPostsOfDetailDone: null,
  loadPostsOfDetailError: null,

  // 2022/01/15 - 게시글 생성 관련 변수 - by 1-blue
  createPostLoading: false,
  createPostDone: null,
  createPostError: null,

  // 2022/01/15 - 특정 게시글 제거 관련 변수 - by 1-blue
  removePostLoading: false,
  removePostDone: null,
  removePostError: null,

  // 2022/01/15 - 특정 게시글에 좋아요 추가 관련 변수 - by 1-blue
  appendLikeToPostLoading: false,
  appendLikeToPostDone: null,
  appendLikeToPostError: null,

  // 2022/01/15 - 특정 게시글에 좋아요 취소 관련 변수 - by 1-blue
  removeLikeToPostLoading: false,
  removeLikeToPostDone: null,
  removeLikeToPostError: null,

  // 2022/01/15 - 특정 게시글에 댓글 추가 관련 변수 - by 1-blue
  appendCommentToPostLoading: false,
  appendCommentToPostDone: null,
  appendCommentToPostError: null,

  // 2022/01/15 - 특정 게시글에 댓글 제거 관련 변수 - by 1-blue
  removeCommentToPostLoading: false,
  removeCommentToPostDone: null,
  removeCommentToPostError: null,

  // 2022/01/15 - 특정 댓글에 좋아요 추가 관련 변수 - by 1-blue
  appendLikeToCommentLoading: false,
  appendLikeToCommentDone: null,
  appendLikeToCommentError: null,

  // 2022/01/15 - 특정 댓글에 좋아요 취소 관련 변수 - by 1-blue
  removeLikeToCommentLoading: false,
  removeLikeToCommentDone: null,
  removeLikeToCommentError: null,

  // 2022/01/16 - 특정 댓글의 답글 요청 관련 변수 - by 1-blue
  loadCommentsLoading: false,
  loadCommentsDone: null,
  loadCommentsError: null,

  // 2022/01/16 - 특정 댓글의 답글 요청 관련 변수 - by 1-blue
  loadRecommentsLoading: false,
  loadRecommentsDone: null,
  loadRecommentsError: null,
  // 2022/01/17 - 답글 불러오기 스피너 동시동작을 막기 위한 변수 - by 1-blue
  loadCommentId: null,
};

function postReducer(prevState = initState, action) {
  // 게시글 상세 정보에 대한 임시 처리결과를 저장할 변수 ( feat: 불변성 )
  let tempPostsOfDetail = null;

  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,

        loadPostsLoading: false,
        loadPostsDone: null,
        loadPostsError: null,

        loadPostLoading: false,
        loadPostDone: null,
        loadPostError: null,

        loadPostsOfHashtagLoading: false,
        loadPostsOfHashtagDone: null,
        loadPostsOfHashtagError: null,

        loadPostsOfUserLoading: false,
        loadPostsOfUserDone: null,
        loadPostsOfUserError: null,

        loadPostsOfDetailLoading: false,
        loadPostsOfDetailDone: null,
        loadPostsOfDetailError: null,

        createPostLoading: false,
        createPostDone: null,
        createPostError: null,

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

        appendLikeToCommentLoading: false,
        appendLikeToCommentDone: null,
        appendLikeToCommentError: null,

        removeLikeToCommentLoading: false,
        removeLikeToCommentDone: null,
        removeLikeToCommentError: null,

        loadCommentsLoading: false,
        loadCommentsDone: null,
        loadCommentsError: null,

        loadRecommentsLoading: false,
        loadRecommentsDone: null,
        loadRecommentsError: null,
        loadCommentId: null,
      };

    // 2022/01/14 - 게시글 생성 모달 열기 - by 1-blue
    case OPEN_CREATE_POST_MODAL:
      return {
        ...prevState,
        showCreatePostModal: true,
      };
    // 2022/01/14 - 게시글 생성 모달 닫기 - by 1-blue
    case CLOSE_CREATE_POST_MODAL:
      return {
        ...prevState,
        showCreatePostModal: false,
      };

    // 2021/12/25 - 특정 게시글 정보 비우기 - by 1-blue
    case RESET_POST:
      return {
        ...prevState,
        post: null,
      };

    // 2022/01/02 - HomePage게시글들 정보 초기화- by 1-blue
    case RESET_POSTS:
      return {
        ...prevState,
        posts: [],
      };

    // 2022/01/05 - 유저 페이지 들어갔을 경우 특정 유저의 게시글들 초기화 - by 1-blue
    case RESET_POSTS_OF_USER:
      return {
        ...prevState,
        postsOfUser: [],
      };

    // 2022/01/15 - HomePage게시글들 요청 - by 1-blue
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
        isMorePosts: action.data.posts.length === action.data.limit,
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...prevState,
        loadPostsLoading: false,
        loadPostsError: action.data.message,
      };

    // 2022/01/15 - 특정 게시글 요청 - by 1-blue
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
        post: { ...action.data.post },
      };
    case LOAD_POST_FAILURE:
      return {
        ...prevState,
        loadPostLoading: false,
        loadPostError: action.data.message,
      };

    // 2022/01/01 - 특정 해시태그의 게시글들 요청 - by 1-blue
    case LOAD_POSTS_OF_HASHTAG_REQUEST:
      return {
        ...prevState,
        loadPostsOfHashtagLoading: true,
        loadPostsOfHashtagDone: null,
        loadPostsOfHashtagError: null,
      };
    case LOAD_POSTS_OF_HASHTAG_SUCCESS:
      // 2022/01/20 - 기존 해시태그에서 추가적으로 요청하는건지 다른 해시태그를 요청하는건지 판단 - by 1-blue
      if (prevState.postsOfHashtagMetadata.hashtagText === action.data.hashtagText) {
        tempPostsOfDetail = [
          ...prevState.postsOfDetail,
          ...action.data.postsOfHashtag.map(post => ({
            ...post,
            hasMoreComments: true,
            allCommentCount: post.Comments.length,
          })),
        ];
      } else {
        tempPostsOfDetail = [
          ...action.data.postsOfHashtag.map(post => ({
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
        postsOfDetail: tempPostsOfDetail,
        postsOfHashtagMetadata: {
          hasMoreHashtagPosts: action.data.postsOfHashtag.length === action.data.limit,
          postsOfHashtagCount: action.data.postsOfHashtagCount,
          hashtagText: action.data.hashtagText,
        },
      };
    case LOAD_POSTS_OF_HASHTAG_FAILURE:
      return {
        ...prevState,
        loadPostsOfHashtagLoading: false,
        loadPostsOfHashtagError: action.data.message,
      };

    // 2022/01/04 - 특정 유저의 게시글들 요청 - by 1-blue
    case LOAD_POSTS_OF_USER_REQUEST:
      return {
        ...prevState,
        loadPostsOfUserLoading: true,
        loadPostsOfUserDone: null,
        loadPostsOfUserError: null,
      };
    case LOAD_POSTS_OF_USER_SUCCESS:
      return {
        ...prevState,
        loadPostsOfUserLoading: false,
        loadPostsOfUserDone: action.data.message,
        postsOfUser: [...prevState.postsOfUser, ...action.data.posts],
        isMorePostsOfUser: action.data.posts.length === action.data.limit,
      };
    case LOAD_POSTS_OF_USER_FAILURE:
      return {
        ...prevState,
        loadPostsOfUserLoading: false,
        loadPostsOfUserError: action.data.message,
      };

    // 2022/01/15 - 게시글들 상세 정보 요청 - by 1-blue
    case LOAD_POSTS_DETAIL_REQUEST:
      return {
        ...prevState,
        loadPostsOfDetailLoading: true,
        loadPostsOfDetailDone: null,
        loadPostsOfDetailError: null,
      };
    case LOAD_POSTS_DETAIL_SUCCESS:
      return {
        ...prevState,
        loadPostsOfDetailLoading: false,
        loadPostsOfDetailDone: action.data.message,
        postsOfDetail: [
          ...prevState.postsOfDetail,
          ...action.data.posts.map(post => ({ ...post, hasMoreComments: true, allCommentCount: post.Comments.length })),
        ],
        isMorePostsOfDetail: action.data.posts.length === action.data.limit,
      };
    case LOAD_POSTS_DETAIL_FAILURE:
      return {
        ...prevState,
        loadPostsOfDetailLoading: false,
        loadPostsOfDetailError: action.data.message,
      };

    // 2022/01/17 - 게시글 생성 - by 1-blue
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
        postsOfDetail: [action.data.createdPost, ...prevState.postsOfDetail],
      };
    case CREATE_POST_FAILURE:
      return {
        ...prevState,
        createPostLoading: false,
        createPostError: action.data.message,
      };

    // 2022/01/17 - 특정 게시글 제거 - by 1-blue
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

        // 2022/01/17 - 특정 게시글 제거 - by 1-blue
        postsOfDetail: prevState.postsOfDetail.filter(post => post._id !== action.data.removedPostId),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...prevState,
        removePostLoading: false,
        removePostError: action.data.message,
      };

    // 2022/01/18 - 게시글 좋아요 추가 - by 1-blue
    case APPEND_LIKE_TO_POST_REQUEST:
      return {
        ...prevState,
        appendLikeToPostLoading: true,
        appendLikeToPostDone: null,
        appendLikeToPostError: null,
      };
    case APPEND_LIKE_TO_POST_SUCCESS:
      // 2022/01/18 - 불변성 지키면서 게시글 배열에 게시글에 좋아요 누른 인원 추가 - by 1-blue
      tempPostsOfDetail = prevState.postsOfDetail.map(post => {
        if (post._id !== action.data.likedPostId) return post;

        return {
          ...post,
          PostLikers: [...post.PostLikers, { _id: action.data.UserId }],
        };
      });

      return {
        ...prevState,
        appendLikeToPostLoading: false,
        appendLikeToPostDone: action.data.message,
        postsOfDetail: tempPostsOfDetail,
      };
    case APPEND_LIKE_TO_POST_FAILURE:
      return {
        ...prevState,
        appendLikeToPostLoading: false,
        appendLikeToPostError: action.data.message,
      };

    // 2022/01/18 - 게시글 좋아요 취소 - by 1-blue
    case REMOVE_LIKE_TO_POST_REQUEST:
      return {
        ...prevState,
        removeLikeToPostLoading: true,
        removeLikeToPostDone: null,
        removeLikeToPostError: null,
      };
    case REMOVE_LIKE_TO_POST_SUCCESS:
      // 2022/01/18 - 불변성 지키면서 게시글 배열에 게시글에 좋아요 누른 인원 제거 - by 1-blue
      tempPostsOfDetail = prevState.postsOfDetail.map(post => {
        if (post._id !== action.data.unlikedPostId) return post;

        return {
          ...post,
          PostLikers: post.PostLikers.filter(liker => liker._id !== action.data.UserId),
        };
      });

      return {
        ...prevState,
        removeLikeToPostLoading: false,
        removeLikeToPostDone: action.data.message,
        postsOfDetail: tempPostsOfDetail,
      };
    case REMOVE_LIKE_TO_POST_FAILURE:
      return {
        ...prevState,
        removeLikeToPostLoading: false,
        removeLikeToPostError: action.data.message,
      };

    // 2022/01/17 - 게시글 댓글/답글 추가 - by 1-blue
    case APPEND_COMMENT_TO_POST_REQUEST:
      return {
        ...prevState,
        appendCommentToPostLoading: true,
        appendCommentToPostDone: null,
        appendCommentToPostError: null,
      };
    case APPEND_COMMENT_TO_POST_SUCCESS:
      // RecommentId

      // 2022/01/16 - 게시글의 댓글 추가 후 postsOfDetail 처리 - by 1-blue
      // 댓글 추가일 경우
      if (!action.data.RecommentId) {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.createdCommentWithData.PostId) return post;

          return {
            ...post,
            Comments: [...post.Comments, { ...action.data.createdCommentWithData }],
            allCommentCount: post.allCommentCount + 1,
          };
        });
      }
      // 답글 추가일 경우
      else {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.createdCommentWithData.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map(comment => {
              if (comment._id !== action.data.RecommentId) return comment;

              return {
                ...comment,
                Recomments: [...comment.Recomments, action.data.createdCommentWithData],
                allRecommentCount: comment.allRecommentCount + 1,
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        appendCommentToPostLoading: false,
        appendCommentToPostDone: action.data.message,
        postsOfDetail: tempPostsOfDetail,
      };
    case APPEND_COMMENT_TO_POST_FAILURE:
      return {
        ...prevState,
        appendCommentToPostLoading: false,
        appendCommentToPostError: action.data.message,
      };

    // 2022/01/17 - 게시글 댓글/답글 삭제 - by 1-blue
    case REMOVE_COMMENT_TO_POST_REQUEST:
      return {
        ...prevState,
        removeCommentToPostLoading: true,
        removeCommentToPostDone: null,
        removeCommentToPostError: null,
      };
    case REMOVE_COMMENT_TO_POST_SUCCESS:
      // 2022/01/16 - 게시글의 댓글 삭제 후 postsOfDetail 처리 - by 1-blue
      // 댓글 삭제
      if (!action.data.RecommentId) {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.removedPostId) return post;

          return {
            ...post,
            Comments: post.Comments.filter(comment => comment._id !== action.data.removedCommentId),
            allCommentCount: post.allCommentCount - 1,
          };
        });
      }
      // 답글 삭제
      else {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.removedPostId) return post;

          return {
            ...post,
            Comments: post.Comments.map(comment => {
              if (comment._id !== action.data.RecommentId) return comment;

              return {
                ...comment,
                Recomments: comment.Recomments.filter(recomment => recomment._id !== action.data.removedCommentId),
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        removeCommentToPostLoading: false,
        removeCommentToPostDone: action.data.message,
        postsOfDetail: tempPostsOfDetail,
      };
    case REMOVE_COMMENT_TO_POST_FAILURE:
      return {
        ...prevState,
        removeCommentToPostLoading: false,
        removeCommentToPostError: action.data.message,
      };

    // 2022/01/18 - 댓글/답글에 좋아요 추가 - by 1-blue
    case APPEND_LIKE_TO_COMMENT_REQUEST:
      return {
        ...prevState,
        appendLikeToCommentLoading: true,
        appendLikeToCommentDone: null,
        appendLikeToCommentError: null,
      };
    case APPEND_LIKE_TO_COMMENT_SUCCESS:
      // 2022/01/18 - 댓글/답글에 좋아요 추가 - by 1-blue
      // 답글에 좋아요 누른 경우
      if (action.data.RecommentId) {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map(comment => {
              if (comment._id !== action.data.RecommentId) return comment;
              return {
                ...comment,
                Recomments: comment.Recomments.map(recomment => {
                  if (recomment._id !== action.data.CommentId) return recomment;

                  return {
                    ...recomment,
                    CommentLikers: [...recomment.CommentLikers, action.data.commentLikerWithData],
                  };
                }),
              };
            }),
          };
        });
      }
      // 댓글에 좋아요 누른 경우
      else {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map(comment => {
              if (comment._id !== action.data.CommentId) return comment;

              return {
                ...comment,
                CommentLikers: [...comment.CommentLikers, action.data.commentLikerWithData],
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        appendLikeToCommentLoading: false,
        appendLikeToCommentDone: action.data.message,
        postsOfDetail: tempPostsOfDetail,
      };
    case APPEND_LIKE_TO_COMMENT_FAILURE:
      return {
        ...prevState,
        appendLikeToCommentLoading: false,
        appendLikeToCommentError: action.data.message,
      };

    // 2022/01/18 - 댓글에 좋아요 취소 - by 1-blue
    case REMOVE_LIKE_TO_COMMENT_REQUEST:
      return {
        ...prevState,
        removeLikeToCommentLoading: true,
        removeLikeToCommentDone: null,
        removeLikeToCommentError: null,
      };
    case REMOVE_LIKE_TO_COMMENT_SUCCESS:
      // 2022/01/18 - 댓글 좋아요 추가 후 post 처리 - by 1-blue
      // 답글일 경우
      if (action.data.RecommentId) {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map(comment => {
              if (comment._id !== action.data.RecommentId) return comment;

              return {
                ...comment,
                Recomments: comment.Recomments.map(recomment => {
                  if (recomment._id !== action.data.CommentId) return recomment;

                  return {
                    ...recomment,
                    CommentLikers: comment.CommentLikers.filter(
                      commentLiker => commentLiker._id !== action.data.UserId,
                    ),
                  };
                }),
              };
            }),
          };
        });

        // 댓글일 경우
      } else {
        tempPostsOfDetail = prevState.postsOfDetail.map(post => {
          if (post._id !== action.data.PostId) return post;

          return {
            ...post,
            Comments: post.Comments.map(comment => {
              if (comment._id !== action.data.CommentId) return comment;

              return {
                ...comment,
                CommentLikers: comment.CommentLikers.filter(commentLiker => commentLiker._id !== action.data.UserId),
              };
            }),
          };
        });
      }

      return {
        ...prevState,
        removeLikeToCommentLoading: false,
        removeLikeToCommentDone: action.data.message,
        postsOfDetail: tempPostsOfDetail,
      };
    case REMOVE_LIKE_TO_COMMENT_FAILURE:
      return {
        ...prevState,
        removeLikeToCommentLoading: false,
        removeLikeToCommentError: action.data.message,
      };

    // 2022/01/16 - 특정 게시글에 댓글들 요청 - by 1-blue
    case LOAD_COMMENTS_REQUEST:
      return {
        ...prevState,
        loadCommentsLoading: true,
        loadCommentsDone: null,
        loadCommentsError: null,
      };
    case LOAD_COMMENTS_SUCCESS:
      tempPostsOfDetail = prevState.postsOfDetail.map(post => {
        if (post._id !== action.data.PostId) return post;

        // 2022/01/17 - 이미 댓글을 불러왔다면 - by 1-blue
        if (post.Comments[0]?.content) {
          return {
            ...post,
            Comments: [
              ...post.Comments,
              ...action.data.Comments.map(comment => ({
                ...comment,
                allRecommentCount: comment.Recomments.length,
                hasMoreRecomments: true,
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
              ...action.data.Comments.map(comment => ({
                ...comment,
                allRecommentCount: comment.Recomments.length,
                hasMoreRecomments: true,
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
        postsOfDetail: tempPostsOfDetail,
      };
    case LOAD_COMMENTS_FAILURE:
      return {
        ...prevState,
        loadCommentsLoading: false,
        loadCommentsError: action.data.message,
      };

    // 2022/01/16 - 특정 댓글의 답글들 요청 - by 1-blue
    case LOAD_RECOMMENTS_REQUEST:
      return {
        ...prevState,
        loadRecommentsLoading: true,
        loadRecommentsDone: null,
        loadRecommentsError: null,
        loadCommentId: action.data.CommentId,
      };
    case LOAD_RECOMMENTS_SUCCESS:
      // 2022/01/17 - 게시글의 특정 댓글의 답글 추가 - by 1-blue
      tempPostsOfDetail = prevState.postsOfDetail.map(post => {
        if (post._id !== action.data.targetPostId) return post;

        return {
          ...post,
          Comments: post.Comments.map(comment => {
            if (comment._id !== action.data.targetCommentId) return comment;

            // 이전에 답글을 불러온적이 있다면
            if (comment.Recomments[0]?.content) {
              return {
                ...comment,
                Recomments: [...comment.Recomments, ...action.data.Recomments],
                hasMoreRecomments: action.data.Recomments.length === action.data.limit,
              };
            }
            // 처음 답글을 불러온다면
            else {
              return {
                ...comment,
                Recomments: [...action.data.Recomments],
                hasMoreRecomments: action.data.Recomments.length === action.data.limit,
              };
            }
          }),
        };
      });

      return {
        ...prevState,
        loadRecommentsLoading: false,
        loadRecommentsDone: action.data.message,
        loadCommentId: null,
        postsOfDetail: tempPostsOfDetail,
      };
    case LOAD_RECOMMENTS_FAILURE:
      return {
        ...prevState,
        loadRecommentsLoading: false,
        loadRecommentsError: action.data.message,
        loadCommentId: null,
      };

    default:
      return prevState;
  }
}

export default postReducer;
