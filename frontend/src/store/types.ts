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
  name: string;
};

// 2022/05/06 - 로그아웃 관련 타입 - by 1-blue
export const LOCAL_LOGOUT_REQUEST = "LOCAL_LOGOUT_REQUEST" as const;
export const LOCAL_LOGOUT_SUCCESS = "LOCAL_LOGOUT_SUCCESS" as const;
export const LOCAL_LOGOUT_FAILURE = "LOCAL_LOGOUT_FAILURE" as const;
export type LogOutResponse = {
  ok: boolean;
};
