import axios from "axios";

const postInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/post",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/22 - 게시글 생성 요청 - by 1-blue
export function apiCreatePost(body) {
  return postInstance.post("/", body);
}

// 2021/12/22 - 최신 게시글들 요청 - by 1-blue
export function apiLoadPosts(body) {
  return postInstance.get(`?lastId=${body.lastId}&limit=${body.limit}`);
}

// 2021/12/22 - 특정 게시글 요청 - by 1-blue
export function apiLoadPost(body) {
  return postInstance.get(`/${body.PostId}`);
}

// 2021/12/22 - 특정 게시글 삭제 요청 - by 1-blue
export function apiRemovePost(body) {
  return postInstance.delete(`/${body.PostId}`);
}

// 2022/01/01 - 특정 해시태그의 게시글들 요청 - by 1-blue
export function apiLoadPostsOfHashtag(body) {
  return postInstance.get(`/hashtag/${body.hashtagText}?lastId=${body.lastId}&limit=${body.limit}`);
}

// 2022/01/04 - 로그인한 유저의 게시글들 요청 - by 1-blue
export function apiLoadPostsOfUser(body) {
  return postInstance.get(`/user/${body.UserId}?lastId=${body.lastId}&limit=${body.limit}`);
}
