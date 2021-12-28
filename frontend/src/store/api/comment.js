import axios from "axios";

const authInstance = axios.create({
  baseURL:
    (process.env.NODE_ENV === "production" ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL) + "/comment",
  withCredentials: true,
  timeout: 2500,
});

// 2021/12/27 - 게시글에 댓글 추가 - by 1-blue
export function apiAppendCommentToPost(body) {
  return authInstance.post("/post", body);
}

// 2021/12/27 - 게시글에 댓글 삭제 - by 1-blue
export function apiRemoveCommentToPost(body) {
  return authInstance.delete(`/post/${body.CommentId}`);
}
