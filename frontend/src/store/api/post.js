import axios from "axios";

export const postInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/post",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/22 - 게시글 생성 요청 - by 1-blue
export const apiCreatePost = body => postInstance.post("/", body);

// 2021/12/22 - 특정 게시글 요청 - by 1-blue
export const apiLoadPost = body => postInstance.get(`/${body.PostId}`);

// 2021/12/22 - 특정 게시글 삭제 요청 - by 1-blue
export const apiRemovePost = body => postInstance.delete(`/${body.PostId}`);
