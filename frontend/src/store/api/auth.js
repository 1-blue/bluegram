import axios from "axios";

const authInstance = axios.create({
  baseURL: `${process.env.SERVER_URL}/auth`,
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

// 로컬 로그인
export function apiLocalLogin(body) {
  return authInstance.post("/", body);
}

// 로컬 로그아웃
export function apiLocalLogout() {
  return authInstance.delete("/");
}
