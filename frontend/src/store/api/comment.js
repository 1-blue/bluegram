import axios from "axios";

export const commentInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/comment",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/27 - 게시글에 댓글 추가 - by 1-blue
export const apiAppendCommentToPost = body => commentInstance.post("/post", body);

// 2021/12/27 - 게시글에 댓글 삭제 - by 1-blue
export const apiRemoveCommentToPost = body => commentInstance.delete(`/post/${body.CommentId}`);

// 2021/12/29 - 특정 댓글의 답글들 가져오기 - by 1-blue
export const apiLoadRecomments = body => commentInstance.get(`/post/${body.CommentId}`);
