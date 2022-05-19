import {
  IPostWithPhotoAndCommentAndLikerAndCount,
  SimpleUser,
} from "@src/type";

// 2022/05/13 - 리셋 메시지 - by 1-blue
export const RESET_MESSAGE = "RESET_MESSAGE" as const;

// 2022/05/06 - 로그인 관련 타입 - by 1-blue
export const LOCAL_LOGIN_REQUEST = "LOCAL_LOGIN_REQUEST" as const;
export const LOCAL_LOGIN_SUCCESS = "LOCAL_LOGIN_SUCCESS" as const;
export const LOCAL_LOGIN_FAILURE = "LOCAL_LOGIN_FAILURE" as const;
export type LogInBody = {
  id: string;
  password: string;
};
export type LogInResponse = {
  ok: boolean;
  message: string;
  user: SimpleUser;
};

// 2022/05/06 - 로그아웃 관련 타입 - by 1-blue
export const LOCAL_LOGOUT_REQUEST = "LOCAL_LOGOUT_REQUEST" as const;
export const LOCAL_LOGOUT_SUCCESS = "LOCAL_LOGOUT_SUCCESS" as const;
export const LOCAL_LOGOUT_FAILURE = "LOCAL_LOGOUT_FAILURE" as const;
export type LogOutResponse = {
  ok: boolean;
  message: string;
};

// 2022/05/13 - 회원가입 관련 타입 - by 1-blue
export const SIGNUP_REQUEST = "SIGNUP_REQUEST" as const;
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS" as const;
export const SIGNUP_FAILURE = "SIGNUP_FAILURE" as const;
export type SignUpBody = {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  introduction: string;
};
export type SignUpResponse = {
  ok: boolean;
  message: string;
};

// 2022/05/07 - 본인 정보 요청 관련 타입 - by 1-blue
export const LOAD_TO_ME_REQUEST = "LOAD_TO_ME_REQUEST" as const;
export const LOAD_TO_ME_SUCCESS = "LOAD_TO_ME_SUCCESS" as const;
export const LOAD_TO_ME_FAILURE = "LOAD_TO_ME_FAILURE" as const;
export type LoadToMeResponse = {
  ok: boolean;
  message: string;
  user: SimpleUser;
} | null;

// 2022/05/19 - 게시글 생성 모달 열기/닫기 - by 1-blue
export const OPEN_WRITE_MODAL = "OPEN_WRITE_MODAL" as const;
export const CLOSE_WRITE_MODAL = "CLOSE_WRITE_MODAL" as const;

// 2022/05/07 - 모든 게시글들 로드 요청 관련 타입 - by 1-blue
export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST" as const;
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS" as const;
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE" as const;
export type LoadPostsBody = {
  lastId: number;
  limit: number;
};
export type LoadPostsResponse = {
  limit: number;
  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
};

// 2022/05/07 - 모든 게시글들 로드 요청 관련 타입 - by 1-blue
export const UPLOAD_POST_REQUEST = "UPLOAD_POST_REQUEST" as const;
export const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS" as const;
export const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE" as const;
export type UploadPostBody = {
  content: string;
  photos: string[];
};
export type UploadPostResponse = {
  ok: boolean;
  message: string;
  createdPost: IPostWithPhotoAndCommentAndLikerAndCount;
};
