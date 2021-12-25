import axios from "axios";

const authInstance = axios.create({
  baseURL: `${process.env.SERVER_URL}/like`,
  withCredentials: true,
  timeout: 2500,
});

// 2021/12/25 - 게시글에 좋아요 추가 - by 1-blue
export function apiAppendLikeToPost(body) {
  return authInstance.post(`/post/${body.PostId}`);
}

// 2021/12/25 - 게시글에 좋아요 삭제 - by 1-blue
export function apiRemoveLikeToPost(body) {
  return authInstance.delete(`/post/${body.PostId}`);
}
