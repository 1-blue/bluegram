import { axiosInstance } from ".";

// type
import type {
  FollowBody,
  FollowResponse,
  LoadFollowersBody,
  LoadFollowersResponse,
  LoadFollowingsBody,
  LoadFollowingsResponse,
} from "@src/store/types";

// 2022/05/21 - 팔로우 요청 - by 1-blue
export const apiFollow = ({ UserId }: FollowBody) =>
  axiosInstance.post<FollowResponse>(`/follow/${UserId}`);

// 2022/05/21 - 언팔로우 요청 - by 1-blue
export const apiUnfollow = ({ UserId }: FollowBody) =>
  axiosInstance.delete<FollowResponse>(`/follow/${UserId}`);

// 2022/05/26 - 특정 유저의 팔로워들 요청 - by 1-blue
export const apiLoadFollowers = ({ UserId }: LoadFollowersBody) =>
  axiosInstance.get<LoadFollowersResponse>(`/follow/followers/${UserId}`);

// 2022/05/26 - 특정 유저의 팔로잉들 - by 1-blue
export const apiLoadFollowings = ({ UserId }: LoadFollowingsBody) =>
  axiosInstance.get<LoadFollowingsResponse>(`/follow/followings/${UserId}`);
