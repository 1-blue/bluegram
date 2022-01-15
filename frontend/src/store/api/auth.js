import axios from "axios";

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/auth",
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

// 2021/12/20 - 로컬 로그인 - by 1-blue
export const apiLocalLogin = body => authInstance.post("/", body);

// 2021/12/20 - 로컬 로그아웃 - by 1-blue
export const apiLocalLogout = () => authInstance.delete("/");
