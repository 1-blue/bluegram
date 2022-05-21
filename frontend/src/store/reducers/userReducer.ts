import {
  RESET_MESSAGE,
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LOAD_TO_ME_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "@src/store/types";
import type { UserActionRequest } from "../actions";
import type { SimpleUser } from "@src/type";

type Me = SimpleUser & {
  Followings: {
    _id: number;
  }[];
  Followers: {
    _id: number;
  }[];
};

export type UserStateType = {
  user: Me | null;

  me: Me | null;
  loadToMeLoading: boolean;
  loadToMeDone: null;
  loadToMeError: null;

  logoutLoading: boolean;
  logoutDone: null;
  logoutError: null;

  signUpLoading: boolean;
  signUpDone: null;
  signUpError: null;

  followLoading: boolean;
  followDone: null | string;
  followError: null;
  unfollowLoading: boolean;
  unfollowDone: null | string;
  unfollowError: null;
};

const initState: UserStateType = {
  // 2022/05/21 - 특정 유저 정보를 저장할 변수 - by 1-blue
  user: null,

  // 2022/05/07 - 본인 정보 저장할 변수 - by 1-blue
  me: null,

  // 2022/05/07 - 본인 정보 요청 관련 변수 - by 1-blue
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,
  // 2022/05/18 - 로그아웃 관련 변수 - by 1-blue
  logoutLoading: false,
  logoutDone: null,
  logoutError: null,
  // 2022/05/18 - 회원가입 관련 변수 - by 1-blue
  signUpLoading: false,
  signUpDone: null,
  signUpError: null,

  // 2022/05/21 - 팔로우 변수 - by 1-blue
  followLoading: false,
  followDone: null,
  followError: null,
  // 2022/05/21 - 언팔로우 변수 - by 1-blue
  unfollowLoading: false,
  unfollowDone: null,
  unfollowError: null,
};

function userReducer(prevState = initState, action: UserActionRequest) {
  let tempMe: null | Me = null;
  let tempUser: null | Me = null;
  let tempFollowers: null | { _id: number }[] = null;
  let tempFollowings: null | { _id: number }[] = null;

  switch (action.type) {
    // 2022/05/13 - 리셋 메시지 - by 1-blue
    case RESET_MESSAGE:
      return {
        ...prevState,
        loginLoading: false,
        loginDone: null,
        loginError: null,
        logoutLoading: false,
        logoutDone: null,
        logoutError: null,
        signUpLoading: false,
        signUpDone: null,
        signUpError: null,
        followLoading: false,
        followDone: null,
        followError: null,
        unfollowLoading: false,
        unfollowDone: null,
        unfollowError: null,
      };

    // 2022/05/07 - 본인 정보 요청 - by 1-blue
    case LOAD_TO_ME_REQUEST:
      return {
        ...prevState,
        loadToMeLoading: true,
        loadToMeDone: null,
        loadToMeError: null,
      };
    case LOAD_TO_ME_SUCCESS:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeDone: action.data?.message,
        me: action.data?.user,
      };
    case LOAD_TO_ME_FAILURE:
      return {
        ...prevState,
        loadToMeLoading: false,
      };

    // 2022/05/21 - 팔로우 요청 - by 1-blue
    case FOLLOW_REQUEST:
      return {
        ...prevState,
        followLoading: true,
        followDone: null,
        followError: null,
      };
    case FOLLOW_SUCCESS:
      if (!prevState.me)
        return {
          ...prevState,
          followLoading: false,
          followDone: "follow-success 버그",
        };

      tempMe = {
        ...prevState.me,
        Followings: [
          ...prevState.me.Followings,
          { _id: action.data.followingId },
        ],
      };
      // 2022/01/19 - 본인 정보창에서 팔로우를 누를 경우 숫자를 증가시키기 위함 - by 1-blue
      if (prevState.user) {
        if (prevState.me._id === prevState.user._id) {
          tempFollowers = [...prevState.user.Followers];
          tempFollowings = [
            ...prevState.user.Followings,
            { _id: action.data.followingId },
          ];
        } else {
          tempFollowers = [
            ...prevState.user.Followers,
            { _id: action.data.followerId },
          ];
          tempFollowings = [...prevState.user.Followings];
        }
        tempUser = {
          ...prevState.user,
          Followers: tempFollowers,
          Followings: tempFollowings,
        };
      } else {
        tempUser = null;
      }

      return {
        ...prevState,
        followLoading: false,
        followDone: action.data?.message,
        me: tempMe,
        user: tempUser,
      };
    case FOLLOW_FAILURE:
      return {
        ...prevState,
        followLoading: false,
      };
    // 2022/05/21 - 언팔로우 요청 - by 1-blue
    case UNFOLLOW_REQUEST:
      return {
        ...prevState,
        unfollowLoading: true,
        unfollowDone: null,
        unfollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      if (!prevState.me)
        return {
          ...prevState,
          followLoading: false,
          followDone: "follow-success 버그",
        };

      tempMe = {
        ...prevState.me,
        Followings: prevState.me.Followings.filter(
          (following) => following._id !== action.data.unfollowingId
        ),
      };

      // 2021/12/31 - 본인 정보창에서 언팔로우를 누를 경우 숫자를 감소시키기 위함 - by 1-blue
      if (prevState.user) {
        if (prevState.me._id === prevState.user._id) {
          tempFollowers = [...prevState.user.Followers];
          tempFollowings = prevState.user.Followings.filter(
            (following) => following._id !== action.data.unfollowingId
          );
        } else {
          tempFollowers = prevState.user.Followers.filter(
            (follower) => follower._id !== action.data.unfollowerId
          );
          tempFollowings = [...prevState.user.Followings];
        }
        tempUser = {
          ...prevState.user,
          Followers: tempFollowers,
          Followings: tempFollowings,
        };
      } else {
        tempUser = null;
      }

      return {
        ...prevState,
        unfollowLoading: false,
        unfollowDone: action.data?.message,
        me: tempMe,
        user: tempUser,
      };
    case UNFOLLOW_FAILURE:
      return {
        ...prevState,
        unfollowLoading: false,
      };

    default:
      return prevState;
  }
}

export default userReducer;
