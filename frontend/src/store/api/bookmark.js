import axios from "axios";

export const bookmarkInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/bookmark",
  withCredentials: true,
  timeout: 10000,
});

// 2022/01/23 - 게시글에 북마크 추가 요청 - by 1-blue
export const apiAppendPostOfBookmark = body => bookmarkInstance.post(`/${body.PostId}`);

// 2022/01/23 - 게시글에 북마크 제거 요청 - by 1-blue
export const apiRemovePostOfBookmark = body => bookmarkInstance.delete(`/${body.PostId}`);

// 2022/01/23 - 로그인한 유저의 북마크된 게시글들 요청 - by 1-blue
export const apiLoadPostsOfBookmark = body => bookmarkInstance.get(`?lastId=${body.lastId}&limit=${body.limit}`);
