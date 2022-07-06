import type { ResponseData, ResponseStatus } from ".";
import type {
  ICommentWithUserAndLikerAndCount,
  ICommentWithUserAndLikerAndCountAndRecomments,
} from "@src/type";

// 2022/07/03 - 게시글의 댓글/답글 추가 요청/응답 타입 - by 1-blue
export type AppendCommentBody = {
  PostId: number;
  content: string;
  RecommentId?: number | null;
};
export type AppendCommentResponse = ResponseStatus & {
  data: ResponseData & {
    RecommentId: number;
    createdComment: ICommentWithUserAndLikerAndCountAndRecomments;
  };
};

// 2022/07/03 - 게시글의 댓글/답글 제거 요청/응답 타입 - by 1-blue
export type RemoveCommentBody = {
  CommentId: number;
};
export type RemoveCommentResponse = ResponseStatus & {
  data: ResponseData & {
    removedCommentId: number;
    removedPostId: number;
    RecommentId?: number | null;
  };
};

// 2022/07/03 - 특정 게시글의 댓글 요청/응답 타입 - by 1-blue
export type LoadCommentsBody = {
  PostId: number;
  lastId: number | null;
  limit: number;
};
export type LoadCommentsResponse = ResponseStatus & {
  data: ResponseData & {
    PostId: number;
    limit: number;
    Comments: ICommentWithUserAndLikerAndCountAndRecomments[];
  };
};

// 2022/07/03 - 특정 댓글의 답글 요청/응답 타입 - by 1-blue
export type LoadRecommentsBody = {
  CommentId: number;
  lastId: number | null;
  limit: number;
};
export type LoadRecommentsResponse = ResponseStatus & {
  data: ResponseData & {
    targetPostId: number;
    targetCommentId: number;
    limit: number;
    Recomments: ICommentWithUserAndLikerAndCount[];
  };
};
