import axios from "axios";

const userInstance = axios.create({
  baseURL: process.env.SERVER_URL + "/user",
  withCredentials: true,
  timeout: 2500,
});

// 2021/12/20 - 로그인한 유저 정보 요청 - by 1-blue
export function apiLoadToMe() {
  return userInstance.get("/me");
}

// 2021/12/20 - 회원가입 요청 - by 1-blue
export function apiSignup(body) {
  return userInstance.post("/", body);
}

// 2021/12/31 - 특정 유저 정보 요청 - by 1-blue
export function apiLoadToUser(body) {
  return userInstance.get(`/${body.UserId}`);
}
