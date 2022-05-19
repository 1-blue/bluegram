import axios from "axios";

// type
import type {
  LoadPostsBody,
  LoadPostsResponse,
  UploadPostBody,
  UploadPostResponse,
} from "../types";

export const postInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/api",
  withCredentials: true,
  timeout: 10000,
});

// 2022/05/07 - 모든 게시글들 요청 - by 1-blue
export const apiLoadPosts = ({ lastId, limit }: LoadPostsBody) =>
  postInstance.get<LoadPostsResponse>(`/posts?lastId=${lastId}&limit=${limit}`);

// 2022/05/19 - 게시글 생성 요청 - by 1-blue
export const apiUploadPost = (body: UploadPostBody) =>
  postInstance.post<UploadPostResponse>(`/post`, body);
