import { axiosInstance } from ".";

// type
import type { LogInBody, LogInResponse, SignUpBody } from "@src/store/types";

// 2022/05/06 - 로컬 로그인 - by 1-blue
export const apiLocalLogin = (body: LogInBody) =>
  axiosInstance.post<LogInResponse>("/auth", body);

// 2022/05/06 - 로컬 로그아웃 - by 1-blue
export const apiLocalLogout = () => axiosInstance.delete("/auth");

// 2022/05/13 - 회원가입 요청 - by 1-blue
export const apiSignup = (body: SignUpBody) =>
  axiosInstance.post("/auth/signup", body);
