import {
  RESET_FOLLOW,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from "@store/types";

// 2021/12/31 - 특정 유저의 팔로워/팔로잉 비우기 액션 크리에이터 - by 1-blue
export function resetFollowAction(data) {
  return {
    type: RESET_FOLLOW,
    data,
  };
}

// 2021/12/31 - 특정 유저의 팔로워들 정보 요청 액션 크리에이터 - by 1-blue
export function loadFollowersAction(data) {
  return {
    type: LOAD_FOLLOWERS_REQUEST,
    data,
  };
}

// 2021/12/31 - 특정 유저의 팔로잉들 정보 요청 액션 크리에이터 - by 1-blue
export function loadFollowingsAction(data) {
  return {
    type: LOAD_FOLLOWINGS_REQUEST,
    data,
  };
}

// 2021/12/30 - 팔로우 액션 크리에이터 - by 1-blue
export function followAction(data) {
  return {
    type: FOLLOW_REQUEST,
    data,
  };
}

// 2021/12/30 - 언팔로우 액션 크리에이터 - by 1-blue
export function unfollowAction(data) {
  return {
    type: UNFOLLOW_REQUEST,
    data,
  };
}
