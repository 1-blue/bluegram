import axios from "axios";

const followInstance = axios.create({
  baseURL:
    (process.env.NODE_ENV === "production" ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL) + "/follow",
  withCredentials: true,
  timeout: 2500,
});

// 2021/12/31 - 특정 유저의 팔로워들 정보 요청 - by 1-blue
export function apiLoadFollowers(body) {
  return followInstance.get(`/followers/${body.UserId}`);
}

// 2021/12/31 - 특정 유저의 팔로앙들 정보 요청 - by 1-blue
export function apiLoadFollowings(body) {
  return followInstance.get(`/followings/${body.UserId}`);
}

// 2021/12/30 - 팔로우요청 - by 1-blue
export function apiFollow(body) {
  return followInstance.post(`/${body.UserId}`);
}

// 2021/12/30 - 언팔로우요청 - by 1-blue
export function apiUnfollow(body) {
  return followInstance.delete(`/${body.UserId}`);
}
