import axios from "axios";

const authInstance = axios.create({
  baseURL: "http://localhost:3000/auth",
  withCredentials: true,
  timeout: 1000,
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

export function apiLoadToMe() {
  return authInstance.get("/");
}
