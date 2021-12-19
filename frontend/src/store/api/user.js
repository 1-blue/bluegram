import axios from "axios";

const authInstance = axios.create({
  baseURL: `${process.env.SERVER_URL}/user`,
  withCredentials: true,
  timeout: 1000,
});

// 로그인한 유저 정보 요청
export function apiLoadToMe() {
  return authInstance.get("/me");
}

// 회원가입 요청
export function apiSignup(body) {
  return authInstance.post("/", body);
}
