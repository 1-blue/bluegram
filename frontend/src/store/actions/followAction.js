import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "@store/types";

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
