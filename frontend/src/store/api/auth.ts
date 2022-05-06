import axios from "axios";

// type
import type { LogInBody, LogInResponse } from "../types";

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth",
  withCredentials: true,
  timeout: 10000,
});

// const myRequestInterceptor = authInstance.interceptors.request.use(
//   config => {
//     return config;
//   },
//   error => {
//     console.log("오류 요청을 보내기전 호출됨");
//     return Promise.reject(error);
//   },
// );

// 2022/05/06 - 로컬 로그인 - by 1-blue
export const apiLocalLogin = (body: LogInBody) =>
  authInstance.post<LogInResponse>("/", body);

// 2022/05/06 - 로컬 로그아웃 - by 1-blue
export const apiLocalLogout = () => authInstance.delete("/");
