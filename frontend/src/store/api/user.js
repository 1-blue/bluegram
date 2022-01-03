import axios from "axios";

const userInstance = axios.create({
  baseURL: process.env.SERVER_URL + "/user",
  withCredentials: true,
  timeout: 10000,
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

// 2022/01/02 - 로그인한 유저의 상세정보 가져오기 - by 1-blue
export function apiLoadToMeDetail() {
  return userInstance.get("/me/detail");
}

// 2022/01/03 - 로그인한 유저의 기본정보 변경 - by 1-blue
export function apiEditToMeAll(body) {
  return userInstance.put("/", body);
}

// 2022/01/03 - 로그인한 유저의 비밀번호 변경 - by 1-blue
export function apiEditToMePassword(body) {
  return userInstance.patch("/", body);
}

// 2022/01/03 - 로그인한 유저의 회원탈퇴 - by 1-blue
export function apiSignOut() {
  return userInstance.delete("/");
}
