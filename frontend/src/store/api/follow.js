import axios from "axios";

export const followInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/follow",
  withCredentials: true,
  timeout: 10000,
});

// 2021/12/31 - 특정 유저의 팔로워들 정보 요청 - by 1-blue
export const apiLoadFollowers = body => followInstance.get(`/followers/${body.UserId}`);

// 2021/12/31 - 특정 유저의 팔로앙들 정보 요청 - by 1-blue
export const apiLoadFollowings = body => followInstance.get(`/followings/${body.UserId}`);

// 2021/12/30 - 팔로우요청 - by 1-blue
export const apiFollow = body => followInstance.post(`/${body.UserId}`);

// 2021/12/30 - 언팔로우요청 - by 1-blue
export const apiUnfollow = body => followInstance.delete(`/${body.UserId}`);
