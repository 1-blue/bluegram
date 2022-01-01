//types
import {
  RESET_MESSAGE,
  RESET_FOLLOW,
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_TO_USER_REQUEST,
  LOAD_TO_USER_SUCCESS,
  LOAD_TO_USER_FAILURE,
} from "@store/types";

const initState = {
  // 로그인한 유저의 데이터
  me: null,

  // 특정 유저 정보
  user: null,

  // 특정 유저의 팔로우/팔로잉 정보
  Followers: null,
  Followings: null,

  // 로그인한 유저 정보 로드
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,

  // 회원가입
  signupLoading: false,
  signupDone: null,
  signupError: null,

  // 2021/12/31 - 특정 유저의 팔로워들 정보 요청 - by 1-blue
  loadFollowersLoading: false,
  loadFollowersDone: null,
  loadFollowersError: null,

  // 2021/12/31 - 특정 유저의 팔로잉들 정보 요청 - by 1-blue
  loadFollowingsLoading: false,
  loadFollowingsDone: null,
  loadFollowingsError: null,

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
  let tempFollowers = null;
  let tempFollowings = null;

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
        loadFollowersLoading: false,
        loadFollowersDone: null,
        loadFollowersError: null,
        loadFollowingsLoading: false,
        loadFollowingsDone: null,
        loadFollowingsError: null,
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

    case RESET_FOLLOW:
      return {
        ...prevState,
        Followers: null,
        Followings: null,
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

    // 2021/12/31 - 특정 유저 팔로워들 정보 요청 - by 1-blue
    case LOAD_FOLLOWERS_REQUEST:
      return {
        ...prevState,
        loadFollowersLoading: true,
        loadFollowersDone: null,
        loadFollowersError: null,
      };
    case LOAD_FOLLOWERS_SUCCESS:
      return {
        ...prevState,
        loadFollowersLoading: false,
        loadFollowersDone: action.data.message,
        Followers: action.data.followers.Followers,
      };
    case LOAD_FOLLOWERS_FAILURE:
      return {
        ...prevState,
        loadFollowersLoading: false,
        loadFollowersError: action.data.message,
      };

    // 2021/12/31 - 특정 유저 팔로잉들 정보 요청 - by 1-blue
    case LOAD_FOLLOWINGS_REQUEST:
      return {
        ...prevState,
        loadFollowingsLoading: true,
        loadFollowingsDone: null,
        loadFollowingsError: null,
      };
    case LOAD_FOLLOWINGS_SUCCESS:
      return {
        ...prevState,
        loadFollowingsLoading: false,
        loadFollowingsDone: action.data.message,
        Followings: action.data.followings.Followings,
      };
    case LOAD_FOLLOWINGS_FAILURE:
      return {
        ...prevState,
        loadFollowingsLoading: false,
        loadFollowingsError: action.data.message,
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
      // 2021/12/31 - 본인 정보창에서 팔로우를 누를 경우 숫자를 증가시키기 위함 - by 1-blue
      if (prevState.me._id === prevState.user._id) {
        tempFollowers = [...prevState.user.Followers];
        tempFollowings = [...prevState.user.Followings, { _id: action.data.Follow.FollowingId }];
      } else {
        tempFollowers = [...prevState.user.Followers, { _id: action.data.Follow.FollowerId }];
        tempFollowings = [...prevState.user.Followings];
      }

      return {
        ...prevState,
        followLoading: false,
        followDone: action.data.message,

        // 2021/12/30 - 특정 유저 팔로우 (나의 팔로워) - by 1-blue
        me: {
          ...prevState.me,
          Followings: [...prevState.me.Followings, { _id: action.data.Follow.FollowingId }],
        },

        // 2021/12/31 - 특정 유저 팔로우 (특정 유저의 팔로잉) - by 1-blue
        user: {
          ...prevState.user,
          Followers: tempFollowers,
          Followings: tempFollowings,
        },
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
      console.log(action.data);

      // 2021/12/31 - 본인 정보창에서 언팔로우를 누를 경우 숫자를 감소시키기 위함 - by 1-blue
      if (prevState.me._id === prevState.user._id) {
        tempFollowers = [...prevState.user.Followers];
        tempFollowings = prevState.user.Followings.filter(
          following => following._id !== action.data.Follow.unfollowingId,
        );
      } else {
        tempFollowers = prevState.user.Followers.filter(follower => follower._id !== action.data.Follow.unfollowerId);
        tempFollowings = [...prevState.user.Followings];
      }
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
          Followers: tempFollowers,
          Followings: tempFollowings,
        },
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
