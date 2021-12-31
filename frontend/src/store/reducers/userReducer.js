/* eslint-disable prettier/prettier */

//types
import {
  RESET_MESSAGE,
  LOAD_TO_ME_REQUEST, LOAD_TO_ME_SUCCESS, LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  LOAD_TO_USER_REQUEST, LOAD_TO_USER_SUCCESS, LOAD_TO_USER_FAILURE,
} from "@store/types";

const initState = {
  // 로그인한 유저의 데이터
  me: null,

  // 특정 유저 정보
  user: null,

  // 로그인한 유저 정보 로드
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,

  // 회원가입
  signupLoading: false,
  signupDone: null,
  signupError: null,

  // 2021/12/30 - 팔로우 요청 - by 1-blue
  followersLoading: false,
  followersDone: null,
  followersError: null,

  // 2021/12/30 - 언팔로우 요청 - by 1-blue
  followingsLoading: false,
  followingsDone: null,
  followingsError: null,

  // 2021/12/31 - 특정 유저 정보 요청 - by 1-blue
  loadToUserLoading: false,
  loadToUserDone: null,
  loadToUserError: null,
};

function userReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeDone: null,
        loadToMeError: null,
        signupLoading: false,
        signupDone: null,
        signupError: null,
        followersLoading: false,
        followersDone: null,
        followersError: null,
        followingsLoading: false,
        followingsDone: null,
        followingsError: null,
        loadToUserLoading: false,
        loadToUserDone: null,
        loadToUserError: null,
      };

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
        loadToMeDone: action.data.message,
        me: action.data.user,
      };
    case LOAD_TO_ME_FAILURE:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeError: action.data.message,
      };

    case SIGNUP_REQUEST:
      return {
        ...prevState,
        signupLoading: true,
        signupDone: null,
        signupError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...prevState,
        signupLoading: false,
        signupDone: action.data.message,
      };
    case SIGNUP_FAILURE:
      return {
        ...prevState,
        signupLoading: false,
        signupError: action.data.message,
      };

    // 2021/12/30 - 팔로우 - 1-blue
    case FOLLOW_REQUEST:
      return {
        ...prevState,
        followLoading: true,
        followDone: null,
        followError: null,
        Followers: action.data.Follows,
      };
    case FOLLOW_SUCCESS:
      console.log(action.data);
      return {
        ...prevState,
        followLoading: false,
        followDone: action.data.message,

        // 2021/12/30 - 특정 유저 팔로우 (나의 팔로우) - by 1-blue
        me: {
          ...prevState.me,
          Followings: [...prevState.me.Followings, { _id: action.data.Follow.FollowingId }],
        },
        
        // 2021/12/31 - 특정 유저 팔로우 (특정 유저의 팔로잉) - by 1-blue
        user: {
          ...prevState.user,
          Followers: [...prevState.user.Followers, { _id: action.data.Follow.FollowerId }],
        }
      };
    case FOLLOW_FAILURE:
      return {
        ...prevState,
        followLoading: false,
        followError: action.data.message,
      };

    // 2021/12/30 - 언팔로우 - by 1-blue
    case UNFOLLOW_REQUEST:
      return {
        ...prevState,
        unfollowLoading: true,
        unfollowDone: null,
        unfollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...prevState,
        unfollowLoading: false,
        unfollowDone: action.data.message,

        // 2021/12/30 - 특정 유저 언팔로우 (나의 언팔로우) - by 1-blue
        me: {
          ...prevState.me,
          Followings: prevState.me.Followings.filter(following => following._id !== action.data.Follow.unfollowingId),
        },

        // 2021/12/31 - 특정 유저 팔로우 (특정 유저의 언팔로잉) - by 1-blue
        user: {
          ...prevState.user,
          Followers: prevState.user.Followers.filter(follower => follower._id !== action.data.Follow.unfollowerId)
        }
      };
    case UNFOLLOW_FAILURE:
      return {
        ...prevState,
        unfollowLoading: false,
        unfollowError: action.data.message,
      };

    // 2021/12/31 - 특정 유저 정보 요청 - by 1-blue
    case LOAD_TO_USER_REQUEST:
      return {
        ...prevState,
        loadToUserLoading: true,
        loadToUserDone: null,
        loadToUserError: null,
      };
    case LOAD_TO_USER_SUCCESS:
      return {
        ...prevState,
        loadToUserLoading: false,
        loadToUserDone: action.data.message,
        user: action.data.user,
      };
    case LOAD_TO_USER_FAILURE:
      return {
        ...prevState,
        loadToUserLoading: false,
        loadToUserError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default userReducer;
