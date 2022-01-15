import {
  RESET_FOLLOW,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from "@store/types";

// 2021/12/31 - 특정 유저의 팔로워/팔로잉 비우기 액션 크리에이터 - by 1-blue
export const resetFollowAction = data => ({ type: RESET_FOLLOW, data });

// 2021/12/31 - 특정 유저의 팔로워들 정보 요청 액션 크리에이터 - by 1-blue
export const loadFollowersAction = data => ({ type: LOAD_FOLLOWERS_REQUEST, data });

// 2021/12/31 - 특정 유저의 팔로잉들 정보 요청 액션 크리에이터 - by 1-blue
export const loadFollowingsAction = data => ({ type: LOAD_FOLLOWINGS_REQUEST, data });

// 2021/12/30 - 팔로우 액션 크리에이터 - by 1-blue
export const followAction = data => ({ type: FOLLOW_REQUEST, data });

// 2021/12/30 - 언팔로우 액션 크리에이터 - by 1-blue
export const unfollowAction = data => ({ type: UNFOLLOW_REQUEST, data });
