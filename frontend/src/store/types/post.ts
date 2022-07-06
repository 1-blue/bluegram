import type { ResponseData, ResponseStatus } from ".";
import type { IPostWithPhotoAndCommentAndLikerAndCount } from "@src/type";

// 2022/07/03 - 게시글 생성 요청/응답 타입 - by 1-blue
export type UploadPostBody = {
  content: string;
  photos: string[];
};
export type UploadPostResponse = ResponseStatus & {
  data: ResponseData & {
    createdPost: IPostWithPhotoAndCommentAndLikerAndCount;
  };
};

// 2022/07/03 - 게시글 제거 요청/응답 타입 - by 1-blue
export type RemovePostBody = {
  PostId: number;
};
export type RemovePostResponse = ResponseStatus & {
  data: ResponseData & {
    removedPostId: number;
  };
};

// 2022/07/03 - 모든 게시글들 정보 로드 요청/응답 타입 - by 1-blue
export type LoadPostsBody = {
  lastId: number;
  limit: number;
};
export type LoadPostsResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  };
};

// 2022/07/03 - 게시글들 상세 정보 로드 요청/응답 타입 - by 1-blue
export type LoadDetailPostsBody = {
  lastId: number;
  limit: number;
};
export type LoadDetailPostsResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  };
};

// 2022/07/03 - 특정 유저의 게시글들 정보 요청/응답 타입 - by 1-blue
export type LoadPostsOfUserBody = {
  UserId: number;
  lastId: number;
  limit: number;
};
export type LoadPostsOfUserResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  };
};

// 2022/07/03 - 특정 유저의 게시글들 상세 정보 요청/응답 타입 - by 1-blue
export type LoadPostsDetailOfUserBody = {
  UserId: number;
  lastId: number;
  limit: number;
};
export type LoadPostsDetailOfUserResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  };
};

// 2022/07/03 - 특정 해시태그를 가지는 게시글들 요청/응답 타입 - by 1-blue
export type LoadPostsOfHashtagBody = {
  hashtag: string;
  lastId: number | null;
  limit: number;
};
export type LoadPostsOfHashtagResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    postCount: number;
    posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  };
};
