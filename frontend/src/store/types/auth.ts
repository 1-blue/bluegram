import type { ResponseData, ResponseStatus } from ".";
import type { UserWithPostAndFollowerAndFollowing } from "@src/type";

// 2022/07/03 - 로그인 관련 요청/응답 타입 - by 1-blue
export type LogInBody = {
  id: string;
  password: string;
};
export type LogInResponse = ResponseStatus & {
  data: ResponseData & {
    user: UserWithPostAndFollowerAndFollowing;
  };
};

// 2022/07/03 - 로그아웃 관련 응답 타입 - by 1-blue
export type LogOutResponse = ResponseStatus & {
  data: ResponseData;
};

// 2022/07/03 - 회원가입 요청/응답 타입 - by 1-blue
export type SignUpBody = {
  id: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  introduction: string;
  avatar?: string;
};
export type SignUpResponse = ResponseStatus & {
  data: ResponseData;
};
