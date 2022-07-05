import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { IPostWithPhotoAndCommentAndLikerAndCount } from "@src/type";
import type {
  AppendBookmarkBody,
  AppendBookmarkResponse,
  AppendCommentBody,
  AppendCommentResponse,
  AppendLikeToCommentBody,
  AppendLikeToCommentResponse,
  AppendLikeToPostBody,
  AppendLikeToPostResponse,
  LoadCommentsBody,
  LoadCommentsResponse,
  LoadDetailPostsBody,
  LoadDetailPostsResponse,
  LoadPostsBody,
  LoadPostsDetailOfUserBody,
  LoadPostsDetailOfUserResponse,
  LoadPostsOfBookmarkResponse,
  LoadPostsOfHashtagBody,
  LoadPostsOfHashtagResponse,
  LoadPostsOfUserBody,
  LoadPostsOfUserResponse,
  LoadPostsResponse,
  LoadRecommentsBody,
  LoadRecommentsResponse,
  RemoveBookmarkBody,
  RemoveBookmarkResponse,
  RemoveCommentBody,
  RemoveCommentResponse,
  RemoveLikeToCommentBody,
  RemoveLikeToCommentResponse,
  RemoveLikeToPostBody,
  RemoveLikeToPostResponse,
  RemovePostBody,
  RemovePostResponse,
  ResponseFailure,
  UploadPostBody,
  UploadPostResponse,
  LoadPostsOfBookmarkBody,
} from "@src/store/types";

export type PostStateType = {
  isShowWritePostModal: boolean;

  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: null | string;
  loadPostsError: null | string;

  uploadPostLoading: boolean;
  uploadPostDone: null | string;
  uploadPostError: null | string;

  detailPosts: IPostWithPhotoAndCommentAndLikerAndCount[];
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
  };

  loadPostsOfUserLoading: boolean;
  loadPostsOfUserDone: null | string;
  loadPostsOfUserError: null | string;

  loadPostsDetailOfUserLoading: boolean;
  loadPostsDetailOfUserDone: null | string;
  loadPostsDetailOfUserError: null | string;

  loadPostsOfBookmarkLoading: boolean;
  loadPostsOfBookmarkDone: null | string;
  loadPostsOfBookmarkError: null | string;
};

const initialState: PostStateType = {
  // 2022/05/19 - 게시글 생성 모달 toggle - by 1-blue
  isShowWritePostModal: false,

  // 2022/05/07 - 모든 게시글들의 정보를 저장할 변수 - by 1-blue
  posts: [],
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
  detailPosts: [],
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
  },

  // 2022/05/26 - 특정 유저의 게시글들 요청 관련 변수 - by 1-blue
  loadPostsOfUserLoading: false,
  loadPostsOfUserDone: null,
  loadPostsOfUserError: null,

  // 2022/05/26 - 특정 유저의 상세 게시글들 요청 관련 변수 - by 1-blue
  loadPostsDetailOfUserLoading: false,
  loadPostsDetailOfUserDone: null,
  loadPostsDetailOfUserError: null,

  // 2022/05/26 - 로그인한 유저의 북마크된 게시글들 요청 관련 변수 - by 1-blue
  loadPostsOfBookmarkLoading: false,
  loadPostsOfBookmarkDone: null,
  loadPostsOfBookmarkError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetMessage(state) {
      state.loadPostsLoading = false;
      state.loadPostsDone = null;
      state.loadPostsError = null;
      state.uploadPostLoading = false;
      state.uploadPostDone = null;
      state.uploadPostError = null;
      state.loadDetailPostsLoading = false;
      state.loadDetailPostsDone = null;
      state.loadDetailPostsError = null;
      state.removePostLoading = false;
      state.removePostDone = null;
      state.removePostError = null;
      state.loadCommentsLoading = false;
      state.loadCommentsDone = null;
      state.loadCommentsError = null;
      state.appendCommentLoading = false;
      state.appendCommentDone = null;
      state.appendCommentError = null;
      state.removeCommentLoading = false;
      state.removeCommentDone = null;
      state.removeCommentError = null;
      state.appendLikeToPostLoading = false;
      state.appendLikeToPostDone = null;
      state.appendLikeToPostError = null;
      state.removeLikeToPostLoading = false;
      state.removeLikeToPostDone = null;
      state.removeLikeToPostError = null;
      state.appendLikeToCommentLoading = false;
      state.appendLikeToCommentDone = null;
      state.appendLikeToCommentError = null;
      state.removeLikeToCommentLoading = false;
      state.removeLikeToCommentDone = null;
      state.removeLikeToCommentError = null;
      state.appendBookmarkLoading = false;
      state.appendBookmarkDone = null;
      state.appendBookmarkError = null;
      state.removeBookmarkLoading = false;
      state.removeBookmarkDone = null;
      state.removeBookmarkError = null;
      state.loadRecommentsLoading = false;
      state.loadRecommentsDone = null;
      state.loadRecommentsError = null;
      state.loadPostsOfHashtagLoading = false;
      state.loadPostsOfHashtagDone = null;
      state.loadPostsOfHashtagError = null;
      state.loadPostsOfUserLoading = false;
      state.loadPostsOfUserDone = null;
      state.loadPostsOfUserError = null;
      state.loadPostsDetailOfUserLoading = false;
      state.loadPostsDetailOfUserDone = null;
      state.loadPostsDetailOfUserError = null;
      state.loadPostsOfBookmarkLoading = false;
      state.loadPostsOfBookmarkDone = null;
      state.loadPostsOfBookmarkError = null;
    },
    // 2022/07/02 - 게시글 생성 모달 열기/닫기 - by 1-blue
    openWritePostModal(state) {
      state.isShowWritePostModal = true;
    },
    closeWritePostModal(state) {
      state.isShowWritePostModal = false;
    },
    // 2022/07/02 - 게시글 생성 요청 - by 1-blue
    uploadPostRequest(state, action: PayloadAction<UploadPostBody>) {
      state.uploadPostLoading = true;
      state.uploadPostDone = null;
      state.uploadPostError = null;
    },
    uploadPostSuccess(state, action: PayloadAction<UploadPostResponse>) {
      state.uploadPostLoading = false;
      state.uploadPostDone = action.payload.data.message;
      state.posts.unshift(action.payload.data.createdPost);
    },
    uploadPostFailure(state, action: PayloadAction<ResponseFailure>) {
      state.uploadPostLoading = false;
      state.uploadPostError = action.payload.data.message;
    },
    // 2022/07/02 - 게시글 제거 요청 - by 1-blue
    removePostRequest(state, action: PayloadAction<RemovePostBody>) {
      state.removePostLoading = true;
      state.removePostDone = null;
      state.removePostError = null;
    },
    removePostSuccess(state, action: PayloadAction<RemovePostResponse>) {
      state.removePostLoading = false;
      state.removePostDone = action.payload.data.message;
      state.detailPosts = state.detailPosts.filter(
        (post) => post._id !== action.payload.data.removedPostId
      );
    },
    removePostFailure(state, action: PayloadAction<ResponseFailure>) {
      state.removePostLoading = false;
      state.removePostError = action.payload.data.message;
    },
    // 2022/07/02 - 모든 게시글들 패치 - by 1-blue
    loadPostsRequest(state, action: PayloadAction<LoadPostsBody>) {
      state.loadPostsLoading = true;
      state.loadPostsDone = null;
      state.loadPostsError = null;
    },
    loadPostsSuccess(state, action: PayloadAction<LoadPostsResponse>) {
      state.loadPostsLoading = false;
      state.loadPostsDone = action.payload.data.message;
      state.posts = [...state.posts, ...action.payload.data.posts];
      state.hasMorePosts =
        action.payload.data.posts.length === action.payload.data.limit;
    },
    loadPostsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload.data.message;
    },
    // 2022/07/02 - 게시글 상세 정보 로드 요청 - by 1-blue
    loadDetailPostsRequest(state, action: PayloadAction<LoadDetailPostsBody>) {
      state.loadDetailPostsLoading = true;
      state.loadDetailPostsDone = null;
      state.loadDetailPostsError = null;
    },
    loadDetailPostsSuccess(
      state,
      action: PayloadAction<LoadDetailPostsResponse>
    ) {
      state.loadDetailPostsLoading = false;
      state.loadDetailPostsDone = action.payload.data.message;
      state.detailPosts = [
        ...state.detailPosts,
        ...action.payload.data.posts.map((post: any) => ({
          ...post,
          hasMoreComments: true,
          allCommentCount: post.Comments.length,
        })),
      ];
      state.hasMoreDeatailPosts =
        action.payload.data.posts.length === action.payload.data.limit;
    },
    loadDetailPostsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadDetailPostsLoading = false;
      state.loadDetailPostsError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 유저의 게시글들 패치 - by 1-blue
    loadPostsOfUserRequest(state, action: PayloadAction<LoadPostsOfUserBody>) {
      state.loadPostsOfUserLoading = true;
      state.loadPostsOfUserDone = null;
      state.loadPostsOfUserError = null;
    },
    loadPostsOfUserSuccess(
      state,
      action: PayloadAction<LoadPostsOfUserResponse>
    ) {
      state.loadPostsOfUserLoading = false;
      state.loadPostsOfUserDone = action.payload.data.message;

      state.posts = [...state.posts, ...action.payload.data.posts];
      state.hasMorePosts =
        action.payload.data.posts.length === action.payload.data.limit;
    },
    loadPostsOfUserFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadPostsOfUserLoading = false;
      state.loadPostsOfUserError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 유저의 게시글들 상세 정보 패치 - by 1-blue
    loadPostsDetailOfUserRequest(
      state,
      action: PayloadAction<LoadPostsDetailOfUserBody>
    ) {
      state.loadPostsDetailOfUserLoading = true;
      state.loadPostsDetailOfUserDone = null;
      state.loadPostsDetailOfUserError = null;
    },
    loadPostsDetailOfUserSuccess(
      state,
      action: PayloadAction<LoadPostsDetailOfUserResponse>
    ) {
      state.loadPostsDetailOfUserLoading = false;
      state.loadPostsDetailOfUserDone = action.payload.data.message;

      state.detailPosts = [
        ...state.detailPosts,
        ...action.payload.data.posts.map((post: any) => ({
          ...post,
          hasMoreComments: true,
          allCommentCount: post.Comments.length,
        })),
      ];
      state.hasMoreDeatailPosts =
        action.payload.data.posts.length === action.payload.data.limit;
    },
    loadPostsDetailOfUserFailure(
      state,
      action: PayloadAction<ResponseFailure>
    ) {
      state.loadPostsDetailOfUserLoading = false;
      state.loadPostsDetailOfUserError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 해시태그 게시글들 패치 - by 1-blue
    loadPostsOfHashtagRequest(
      state,
      action: PayloadAction<LoadPostsOfHashtagBody>
    ) {
      state.loadPostsOfHashtagLoading = true;
      state.loadPostsOfHashtagDone = null;
      state.loadPostsOfHashtagError = null;
    },
    loadPostsOfHashtagSuccess(
      state,
      action: PayloadAction<LoadPostsOfHashtagResponse>
    ) {
      state.loadPostsOfHashtagLoading = false;
      state.loadPostsOfHashtagDone = action.payload.data.message;

      state.detailPosts = [
        ...state.detailPosts,
        ...action.payload.data.posts.map((post: any) => ({
          ...post,
          hasMoreComments: true,
          allCommentCount: post.Comments.length,
        })),
      ];
      state.hashtagData.hasMoreHashtagPosts =
        action.payload.data.posts.length === action.payload.data.limit;
      state.hashtagData.postsOfHashtagCount = action.payload.data.postCount;
    },
    loadPostsOfHashtagFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadPostsOfHashtagLoading = false;
      state.loadPostsOfHashtagError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 게시글의 댓글/답글 추가 요청 - by 1-blue
    appendCommentRequest(state, action: PayloadAction<AppendCommentBody>) {
      state.appendCommentLoading = true;
      state.appendCommentDone = null;
      state.appendCommentError = null;
    },
    appendCommentSuccess(state, action: PayloadAction<AppendCommentResponse>) {
      state.appendCommentLoading = false;
      state.appendCommentDone = action.payload.data.message;

      let targetPost = state.detailPosts.find(
        (post) => post._id === action.payload.data.createdComment.PostId
      );
      if (!targetPost)
        return console.warn("appendCommentSuccess >> 게시글 없음");

      // 답글 추가
      if (action.payload.data.RecommentId) {
        const targetComment = targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.RecommentId
        );
        if (!targetComment)
          return console.warn("appendCommentSuccess >> 댓글 없음");

        targetComment.Recomments.push(action.payload.data.createdComment);
        targetComment.allCommentCount += 1;
      }
      // 댓글 추가
      else {
        targetPost.Comments.push(action.payload.data.createdComment);
        targetPost.allCommentCount += 1;
      }
    },
    appendCommentFailure(state, action: PayloadAction<ResponseFailure>) {
      state.appendCommentLoading = false;
      state.appendCommentError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 게시글의 댓글/답글 제거 요청 - by 1-blue
    removeCommentRequest(state, action: PayloadAction<RemoveCommentBody>) {
      state.removeCommentLoading = true;
      state.removeCommentDone = null;
      state.removeCommentError = null;
    },
    removeCommentSuccess(state, action: PayloadAction<RemoveCommentResponse>) {
      state.removeCommentLoading = false;
      state.removeCommentDone = action.payload.data.message;

      let targetPost = state.detailPosts?.find(
        (post) => post._id === action.payload.data.removedPostId
      );
      if (!targetPost)
        return console.warn("removeCommentSuccess >> 게시글 없음");

      // 답글 제거
      if (action.payload.data.RecommentId) {
        const targetComment = targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.RecommentId
        );
        if (!targetComment)
          return console.warn("removeCommentSuccess >> 댓글 없음");

        targetComment.Recomments = targetComment.Recomments.filter(
          (comment) => comment._id !== action.payload.data.removedCommentId
        );
        targetComment.allCommentCount -= 1;
      }
      // 댓글 제거
      else {
        targetPost.Comments = targetPost.Comments.filter(
          (comment) => comment._id !== action.payload.data.removedCommentId
        );
        targetPost.allCommentCount -= 1;
      }
    },
    removeCommentFailure(state, action: PayloadAction<ResponseFailure>) {
      state.removeCommentLoading = false;
      state.removeCommentError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 게시글의 댓글 로드 요청 - by 1-blue
    loadCommentsRequest(state, action: PayloadAction<LoadCommentsBody>) {
      state.loadCommentsLoading = true;
      state.loadCommentsDone = null;
      state.loadCommentsError = null;
    },
    loadCommentsSuccess(state, action: PayloadAction<LoadCommentsResponse>) {
      state.loadCommentsLoading = false;
      state.loadCommentsDone = action.payload.data.message;

      const targetPost = state.detailPosts.find(
        (post) => post._id === action.payload.data.PostId
      );
      if (!targetPost)
        return console.warn("loadCommentsSuccess >> 게시글 없음");

      targetPost.hasMoreComments =
        action.payload.data.Comments.length === action.payload.data.limit;

      // 이미 댓글을 불러왔다면
      if (targetPost.Comments[0].content) {
        targetPost.Comments.splice(
          targetPost.Comments.length,
          0,
          ...action.payload.data.Comments.map((comment) => ({
            ...comment,
            allCommentCount: comment.Recomments.length,
            hasMoreComments: true,
          }))
        );
      }
      // 처음 댓글을 불러온다면
      else {
        targetPost.Comments = action.payload.data.Comments.map((comment) => ({
          ...comment,
          allCommentCount: comment.Recomments.length,
          hasMoreComments: true,
        }));
      }
    },
    loadCommentsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadCommentsLoading = false;
      state.loadCommentsError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 댓글의 답글 패치 - by 1-blue
    loadRecommentsRequest(state, action: PayloadAction<LoadRecommentsBody>) {
      state.loadRecommentsLoading = true;
      state.loadRecommentsDone = null;
      state.loadRecommentsError = null;
    },
    loadRecommentsSuccess(
      state,
      action: PayloadAction<LoadRecommentsResponse>
    ) {
      state.loadRecommentsLoading = false;
      state.loadRecommentsDone = action.payload.data.message;

      const targetPost = state.detailPosts.find(
        (post) => post._id === action.payload.data.targetPostId
      );
      if (!targetPost)
        return console.warn("loadRecommentsSuccess >> 게시글 없음");
      const targetComment = targetPost.Comments.find(
        (comment) => comment._id === action.payload.data.targetCommentId
      );
      if (!targetComment)
        return console.warn("loadRecommentsSuccess >> 댓글 없음");

      // 기존에 답글 불러온 경우
      if (targetComment.Recomments[0].content) {
        targetComment.Recomments.splice(
          targetComment.Recomments.length,
          0,
          ...action.payload.data.Recomments
        );
      }
      // 처음 답글 불러오는 경우
      else {
        targetComment.Recomments = action.payload.data.Recomments;
      }

      targetComment.hasMoreComments =
        action.payload.data.Recomments.length === action.payload.data.limit;
    },
    loadRecommentsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadRecommentsLoading = false;
      state.loadRecommentsError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 게시글에 좋아요 추가 요청 - by 1-blue
    appendLikeToPostRequest(
      state,
      action: PayloadAction<AppendLikeToPostBody>
    ) {
      state.appendLikeToPostLoading = true;
      state.appendLikeToPostDone = null;
      state.appendLikeToPostError = null;
    },
    appendLikeToPostSuccess(
      state,
      action: PayloadAction<AppendLikeToPostResponse>
    ) {
      state.appendLikeToPostLoading = false;
      state.appendLikeToPostDone = action.payload.data.message;

      // 게시글에 좋아요 추가
      state.detailPosts
        .find((post) => post._id === action.payload.data.likedPostId)
        ?.PostLikers.push({
          _id: action.payload.data.UserId,
          name: "",
          Photos: [],
        });
    },
    appendLikeToPostFailure(state, action: PayloadAction<ResponseFailure>) {
      state.appendLikeToPostLoading = false;
      state.appendLikeToPostError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 게시글에 좋아요 제거 요청 - by 1-blue
    removeLikeToPostRequest(
      state,
      action: PayloadAction<RemoveLikeToPostBody>
    ) {
      state.removeLikeToPostLoading = true;
      state.removeLikeToPostDone = null;
      state.removeLikeToPostError = null;
    },
    removeLikeToPostSuccess(
      state,
      action: PayloadAction<RemoveLikeToPostResponse>
    ) {
      state.removeLikeToPostLoading = false;
      state.removeLikeToPostDone = action.payload.data.message;

      const targetPostIndex = state.detailPosts.findIndex(
        (post) => post._id === action.payload.data.unlikedPostId
      );

      if (targetPostIndex === -1)
        return console.warn("removeLikeToPostSuccess >> 게시글 없음");

      state.detailPosts[targetPostIndex].PostLikers = state.detailPosts[
        targetPostIndex
      ].PostLikers.filter((liker) => liker._id !== action.payload.data.UserId);
    },
    removeLikeToPostFailure(state, action: PayloadAction<ResponseFailure>) {
      state.removeLikeToPostLoading = false;
      state.removeLikeToPostError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 댓글/답글에 좋아요 추가 요청 - by 1-blue
    appendLikeToCommentRequest(
      state,
      action: PayloadAction<AppendLikeToCommentBody>
    ) {
      state.appendLikeToCommentLoading = true;
      state.appendLikeToCommentDone = null;
      state.appendLikeToCommentError = null;
    },
    appendLikeToCommentSuccess(
      state,
      action: PayloadAction<AppendLikeToCommentResponse>
    ) {
      state.appendLikeToCommentLoading = false;
      state.appendLikeToCommentDone = action.payload.data.message;

      const targetPost = state.detailPosts.find(
        (post) => post._id === action.payload.data.PostId
      );
      if (!targetPost)
        return console.warn("appendLikeToCommentSuccess >> 게시글 없음");

      let targetComment = null;

      // 답글 찾기
      if (action.payload.data.RecommentId) {
        targetComment = targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.RecommentId
        )?.Recomments.find(
          (recomment) => recomment._id === action.payload.data.CommentId
        );
      }
      // 댓글 찾기
      else {
        targetComment = targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.CommentId
        );
      }
      // 좋아요 추가
      if (!targetComment)
        return console.warn("appendLikeToCommentSuccess >> 댓글 없음");
      targetComment.CommentLikers.push(action.payload.data.commentLiker);
    },
    appendLikeToCommentFailure(state, action: PayloadAction<ResponseFailure>) {
      state.appendLikeToCommentLoading = false;
      state.appendLikeToCommentError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 댓글/답글에 좋아요 제거 요청 - by 1-blue
    removeLikeToCommentRequest(
      state,
      action: PayloadAction<RemoveLikeToCommentBody>
    ) {
      state.removeLikeToCommentLoading = true;
      state.removeLikeToCommentDone = null;
      state.removeLikeToCommentError = null;
    },
    removeLikeToCommentSuccess(
      state,
      action: PayloadAction<RemoveLikeToCommentResponse>
    ) {
      state.removeLikeToCommentLoading = false;
      state.removeLikeToCommentDone = action.payload.data.message;

      const targetPost = state.detailPosts.find(
        (post) => post._id === action.payload.data.PostId
      );
      if (!targetPost) return;

      // 답글에 좋아요 제거
      if (action.payload.data.RecommentId) {
        const targetRecommentIndex = targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.RecommentId
        )?.Recomments.findIndex(
          (recomment) => recomment._id === action.payload.data.CommentId
        );

        if (targetRecommentIndex === -1 || targetRecommentIndex === undefined)
          return console.warn("removeLikeToCommentSuccess >> 답글 좋아요 추가");

        targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.RecommentId
        )
          ?.Recomments.find(
            (recomment) => recomment._id === action.payload.data.CommentId
          )
          ?.CommentLikers.splice(targetRecommentIndex, 1);
      }
      // 댓글에 좋아요 제거
      else {
        const targetCommentIndex = targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.CommentId
        )?.CommentLikers.findIndex(
          (liker) => liker._id === action.payload.data.UserId
        );
        if (targetCommentIndex === -1 || targetCommentIndex === undefined)
          return console.warn("removeLikeToCommentSuccess >> 댓글 좋아요 제거");

        targetPost.Comments.find(
          (comment) => comment._id === action.payload.data.CommentId
        )?.CommentLikers.splice(targetCommentIndex, 1);
      }
    },
    removeLikeToCommentFailure(state, action: PayloadAction<ResponseFailure>) {
      state.removeLikeToCommentLoading = false;
      state.removeLikeToCommentError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 게시글에 북마크 추가 - by 1-blue
    appendBookmarkRequest(state, action: PayloadAction<AppendBookmarkBody>) {
      state.appendBookmarkLoading = true;
      state.appendBookmarkDone = null;
      state.appendBookmarkError = null;
    },
    appendBookmarkSuccess(
      state,
      action: PayloadAction<AppendBookmarkResponse>
    ) {
      state.appendBookmarkLoading = false;
      state.appendBookmarkDone = action.payload.data.message;

      state.detailPosts
        .find((post) => post._id === action.payload.data.PostId)
        ?.PostBookmarks.push({
          _id: action.payload.data.UserId,
          name: "",
          Photos: [],
          introduction: "",
        });
    },
    appendBookmarkFailure(state, action: PayloadAction<ResponseFailure>) {
      state.appendBookmarkLoading = false;
      state.appendBookmarkError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 게시글에 북마크 제거 - by 1-blue
    removeBookmarkRequest(state, action: PayloadAction<RemoveBookmarkBody>) {
      state.removeBookmarkLoading = true;
      state.removeBookmarkDone = null;
      state.removeBookmarkError = null;
    },
    removeBookmarkSuccess(
      state,
      action: PayloadAction<RemoveBookmarkResponse>
    ) {
      state.removeBookmarkLoading = false;
      state.removeBookmarkDone = action.payload.data.message;

      const targetPost = state.detailPosts.find(
        (post) => post._id === action.payload.data.PostId
      );
      if (!targetPost)
        return console.warn("removeBookmarkSuccess >> 게시글 없음");

      targetPost.PostBookmarks = targetPost.PostBookmarks.filter(
        (post) => post._id !== action.payload.data.UserId
      );
    },
    removeBookmarkFailure(state, action: PayloadAction<ResponseFailure>) {
      state.removeBookmarkLoading = false;
      state.removeBookmarkError = action.payload.data.message;
    },
    // 2022/07/02 - 로그인한 유저의 북마크된 게시글들 패치 - by 1-blue
    loadPostsOfBookmarkRequest(
      state,
      action: PayloadAction<LoadPostsOfBookmarkBody>
    ) {
      state.loadPostsOfBookmarkLoading = true;
      state.loadPostsOfBookmarkDone = null;
      state.loadPostsOfBookmarkError = null;
    },
    loadPostsOfBookmarkSuccess(
      state,
      action: PayloadAction<LoadPostsOfBookmarkResponse>
    ) {
      state.loadPostsOfBookmarkLoading = false;
      state.loadPostsOfBookmarkDone = action.payload.data.message;

      state.detailPosts = [
        ...state.detailPosts,
        ...action.payload.data.posts.map((post) => ({
          ...post,
          hasMoreComments: true,
          allCommentCount: post.Comments.length,
        })),
      ];
      state.hasMoreDeatailPosts =
        action.payload.data.posts.length === action.payload.data.limit;
    },
    loadPostsOfBookmarkFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadPostsOfBookmarkLoading = false;
      state.loadPostsOfBookmarkError = action.payload.data.message;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
