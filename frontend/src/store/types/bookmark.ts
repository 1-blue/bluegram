import type { ResponseData, ResponseStatus } from ".";
import type { IPostWithPhotoAndCommentAndLikerAndCount } from "@src/type";

// 2022/07/03 - 게시글 북마크 추가 요청/응답 타입 - by 1-blue
export type AppendBookmarkBody = {
  PostId: number;
};
export type AppendBookmarkResponse = ResponseStatus & {
  data: ResponseData & {
    PostId: number;
    UserId: number;
  };
};

// 2022/07/03 - 게시글 북마크 제거 요청/응답 타입 - by 1-blue
export type RemoveBookmarkBody = {
  PostId: number;
};
export type RemoveBookmarkResponse = ResponseStatus & {
  data: ResponseData & {
    PostId: number;
    UserId: number;
  };
};

// 2022/07/03 - 로그인한 유저의 북마크된 게시글들 요청/응답 타입 - by 1-blue
export type LoadPostsOfBookmarkBody = {
  lastId?: number;
  limit: number;
};
export type LoadPostsOfBookmarkResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  };
};
