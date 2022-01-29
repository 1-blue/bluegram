import axios from "axios";

export const postsInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/posts",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/22 - 게시글들 요청 - by 1-blue
export const apiLoadPosts = body => postsInstance.get(`?lastId=${body.lastId}&limit=${body.limit}`);

// 2022/01/15 - 게시글들 상세 내용 요청 - by 1-blue
export const apiLoadPostsDetail = body => postsInstance.get(`/detail?lastId=${body.lastId}&limit=${body.limit}`);

// 2022/01/01 - 특정 해시태그의 게시글들 요청 - by 1-blue
export const apiLoadPostsOfHashtag = body =>
  postsInstance.get(`/hashtag/${body.hashtagText}?lastId=${body.lastId}&limit=${body.limit}`);

// 2022/01/04 - 로그인한 유저의 게시글들 요청 - by 1-blue
export const apiLoadPostsOfUser = body =>
  postsInstance.get(`/user/${body.UserId}?lastId=${body.lastId}&limit=${body.limit}`);

// 2022/01/21 - 특정 유저의 게시글들 상세 내용 요청 - by 1-blue
export const apiLoadPostsDetailOfUser = body =>
  postsInstance.get(`/user/detail/${body.UserId}?lastId=${body.lastId}&limit=${body.limit}`);
