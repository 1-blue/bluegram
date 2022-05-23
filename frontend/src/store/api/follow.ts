import { axiosInstance } from ".";

// type
import type { FollowBody, FollowResponse } from "../types";

// 2022/05/21 - 팔로우 요청 - by 1-blue
export const apiFollow = ({ UserId }: FollowBody) =>
  axiosInstance.post<FollowResponse>(`/follow/${UserId}`);
// 2022/05/21 - 언팔로우 요청 - by 1-blue
export const apiUnfollow = ({ UserId }: FollowBody) =>
  axiosInstance.delete<FollowResponse>(`/follow/${UserId}`);
