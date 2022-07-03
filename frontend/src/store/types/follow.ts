import type { ResponseData, ResponseStatus } from ".";
import type { SimpleUser } from "@src/type";

// 2022/07/03 - 특정 유저의 팔로워들 요청/응답 타입 - by 1-blue
export type LoadFollowersBody = {
  UserId: number;
};
export type LoadFollowersResponse = ResponseStatus & {
  data: ResponseData & {
    followers: SimpleUser[];
  };
};

// 2022/07/03 - 특정 유저의 팔로잉들 요청/응답 타입 - by 1-blue
export type LoadFollowingsBody = {
  UserId: number;
};
export type LoadFollowingsResponse = ResponseStatus & {
  data: ResponseData & {
    followings: SimpleUser[];
  };
};

// 2022/07/03 - 팔로우 요청/응답 타입 - by 1-blue
export type FollowBody = {
  UserId: number;
};
export type FollowResponse = ResponseStatus & {
  data: ResponseData & {
    followerId: number;
    followingId: number;
  };
};

// 2022/07/03 - 언팔로우 요청/응답 타입 - by 1-blue
export type UnfollowBody = {
  UserId: number;
};
export type UnfollowResponse = ResponseStatus & {
  data: ResponseData & {
    unfollowerId: number;
    unfollowingId: number;
  };
};
