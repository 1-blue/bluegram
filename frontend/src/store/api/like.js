import axios from "axios";

const likeInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/like",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/25 - 게시글에 좋아요 추가 - by 1-blue
export function apiAppendLikeToPost(body) {
  return likeInstance.post(`/post/${body.PostId}`);
}

// 2021/12/25 - 게시글에 좋아요 삭제 - by 1-blue
export function apiRemoveLikeToPost(body) {
  return likeInstance.delete(`/post/${body.PostId}`);
}

// 2021/12/28 - 댓글에 좋아요 추가 - by 1-blue
export function apiAppendLikeToComment(body) {
  return likeInstance.post(`/comment/${body.CommentId}`);
}

// 2021/12/28 - 댓글에 좋아요 삭제 - by 1-blue
export function apiRemoveLikeToComment(body) {
  return likeInstance.delete(`/comment/${body.CommentId}`);
}
