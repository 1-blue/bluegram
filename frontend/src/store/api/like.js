import axios from "axios";

export const likeInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/like",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/25 - 게시글에 좋아요 추가 - by 1-blue
export const apiAppendLikeToPost = body => likeInstance.post(`/post/${body.PostId}`);

// 2021/12/25 - 게시글에 좋아요 삭제 - by 1-blue
export const apiRemoveLikeToPost = body => likeInstance.delete(`/post/${body.PostId}`);

// 2021/12/28 - 댓글에 좋아요 추가 - by 1-blue
export const apiAppendLikeToComment = body => likeInstance.post(`/comment/${body.CommentId}`);

// 2021/12/28 - 댓글에 좋아요 삭제 - by 1-blue
export const apiRemoveLikeToComment = body => likeInstance.delete(`/comment/${body.CommentId}`);
