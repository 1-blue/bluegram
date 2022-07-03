import type { ResponseData, ResponseStatus } from ".";

// 2022/07/03 - 게시글에 좋아요 추가 요청/응답 타입 - by 1-blue
export type AppendLikeToPostBody = {
  PostId: number;
};
export type AppendLikeToPostResponse = ResponseStatus & {
  data: ResponseData & {
    likedPostId: number;
    UserId: number;
  };
};

// 2022/07/03 - 게시글에 좋아요 제거 요청/응답 타입 - by 1-blue
export type RemoveLikeToPostBody = {
  PostId: number;
};
export type RemoveLikeToPostResponse = ResponseStatus & {
  data: ResponseData & {
    unlikedPostId: number;
    UserId: number;
  };
};

// 2022/07/03 - 댓글/답글에 좋아요 추가 요청/응답 타입 - by 1-blue
export type AppendLikeToCommentBody = {
  CommentId: number;
};
export type AppendLikeToCommentResponse = ResponseStatus & {
  data: ResponseData & {
    PostId: number;
    CommentId: number;
    RecommentId?: number | null;
    commentLiker: {
      _id: number;
      name: string;
    };
  };
};

// 2022/07/03 - 댓글/답글의 좋아요 제거 요청/응답 타입 - by 1-blue
export type RemoveLikeToCommentBody = {
  CommentId: number;
};
export type RemoveLikeToCommentResponse = ResponseStatus & {
  data: ResponseData & {
    PostId: number;
    CommentId: number;
    RecommentId?: number | null;
    UserId: number;
  };
};
