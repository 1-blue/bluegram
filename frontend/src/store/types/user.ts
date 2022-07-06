import type { ResponseData, ResponseStatus } from ".";
import type {
  Photo,
  User,
  UserWithPostAndFollowerAndFollowing,
} from "@src/type";

// 2022/07/03 - 본인 정보 응답 타입 - by 1-blue
export type LoadToMeResponse = ResponseStatus & {
  data: ResponseData & {
    user: UserWithPostAndFollowerAndFollowing | null;
  };
};

// 2022/07/03 - 로그인한 유저 상세 정보 가져오기 요청/응답 타입 - by 1-blue
export type LoadToMeDetailResponse = ResponseStatus & {
  data: ResponseData & {
    me: User & { Photos?: Photo[] };
  };
};

// 2022/07/03 - 특정 유저 정보 요청/응답 타입 - by 1-blue
export type LoadToUserBody = {
  UserId: number;
};
export type LoadToUserResponse = ResponseStatus & {
  data: ResponseData & {
    user: UserWithPostAndFollowerAndFollowing;
  };
};

// 2022/07/03 - 로그인한 유저 정보 변경 요청/응답 타입 - by 1-blue
export type EditAccountBody = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  introduction: string;
  avatar?: string;
};
export type EditAccountResponse = ResponseStatus & {
  data: ResponseData;
};

// 2022/07/03 - 로그인한 유저 비밀번호 변경 요청/응답 - by 1-blue
export type EditPasswordBody = {
  currentPassword: string;
  password: string;
};
export type EditPasswordResponse = ResponseStatus & {
  data: ResponseData;
};

// 2022/06/02 - 로그인한 유저 회원탈퇴 변경 요청/응답 - by 1-blue
export type SignOutBody = {
  password: string;
};
export type SignOutResponse = ResponseStatus & {
  data: ResponseData;
};
