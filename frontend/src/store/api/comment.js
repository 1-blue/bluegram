import axios from "axios";

const commentInstance = axios.create({
  baseURL: process.env.SERVER_URL + "/comment",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/27 - 게시글에 댓글 추가 - by 1-blue
export function apiAppendCommentToPost(body) {
  return commentInstance.post("/post", body);
}

// 2021/12/27 - 게시글에 댓글 삭제 - by 1-blue
export function apiRemoveCommentToPost(body) {
  return commentInstance.delete(`/post/${body.CommentId}`);
}

// 2021/12/29 - 특정 댓글의 답글들 가져오기 - by 1-blue
export function apiLoadRecomments(body) {
  return commentInstance.get(`/post/${body.CommentId}`);
}
