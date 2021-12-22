// 2021/12/22 - 게시글 관련 api 요청 - by 1-blue

import axios from "axios";

const postInstance = axios.create({
  baseURL: `${process.env.SERVER_URL}/post`,
  withCredentials: true,
  timeout: 1000,
});

// 2021/12/22 - 게시글 생성 요청 - by 1-blue
export function apiCreatePost(body) {
  return postInstance.post("/", body);
}

// 2021/12/22 - 게시글 생성 요청 - by 1-blue
export function apiLoadPosts(body) {
  return postInstance.get(`?lastId=${body.lastId}`);
}
