/* eslint-disable prettier/prettier */

import {
  RESET_MESSAGE,
  RESET_FOLLOW,

  LOAD_TO_ME_REQUEST, LOAD_TO_ME_SUCCESS, LOAD_TO_ME_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  LOAD_TO_USER_REQUEST, LOAD_TO_USER_SUCCESS, LOAD_TO_USER_FAILURE,
  LOAD_TO_ME_DETAIL_REQUEST, LOAD_TO_ME_DETAIL_SUCCESS, LOAD_TO_ME_DETAIL_FAILURE,
  EDIT_TO_ME_ALL_REQUEST, EDIT_TO_ME_ALL_SUCCESS, EDIT_TO_ME_ALL_FAILURE,
  EDIT_TO_ME_PASSWORD_REQUEST, EDIT_TO_ME_PASSWORD_SUCCESS, EDIT_TO_ME_PASSWORD_FAILURE,
  SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE,
} from "@store/types";

const initState = {
  // 2022/01/15 - 로그인한 유저의 데이터 - by 1-blue
  me: {},

  // 2022/01/15 - 특정 유저의 정보 - by 1-blue
  user: null,

  // 2022/01/15 - 특정 유저의 팔로워/팔로잉 정보 - by 1-blue
  Followers: null,
  Followings: null,

  // 2022/01/15 - 로그인한 유저 정보 관련 변수 - by 1-blue
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,

  // 2022/01/15 - 회원가입 관련 변수 - by 1-blue
  signupLoading: false,
  signupDone: null,
  signupError: null,

  // 2022/01/15 - 팔로우 요청 관련 변수 - by 1-blue
  followLoading: false,
  followDone: null,
  followError: null,

  // 2022/01/15 - 언팔로우 요청 관련 변수 - by 1-blue
  unfollowLoading: false,
  unfollowDone: null,
  unfollowError: null,

  // 2022/01/15 - 특정 유저의 팔로워들 요청 관련 변수 - by 1-blue
  loadFollowersLoading: false,
  loadFollowersDone: null,
  loadFollowersError: null,

  // 2022/01/15 - 특정 유저의 팔로잉들 정보 요청 관련 변수 - by 1-blue
  loadFollowingsLoading: false,
  loadFollowingsDone: null,
  loadFollowingsError: null,

  // 2022/01/15 - 특정 유저 정보 요청 관련 변수 - by 1-blue
  loadToUserLoading: false,
  loadToUserDone: null,
  loadToUserError: null,

  // 2022/01/15 - 로그인한 유저 기본 정보 변경 관련 변수 - by 1-blue
  editToMeAllLoading: false,
  editToMeAllDone: null,
  editToMeAllError: null,

  // 2022/01/15 - 로그인한 유저의 비밀번호 변경 요청 관련 변수 - by 1-blue
  editToMePasswordLoading: false,
  editToMePasswordDone: null,
  editToMePasswordError: null,

  // 2022/01/15 - 로그인한 유저 회원탈퇴 관련 요청 변수 - by 1-blue
  signOutLoading: false,
  signOutDone: null,
  signOutError: null,
};

function userReducer(prevState = initState, action) {
  let tempMe = null;
  let tempUser = null;
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

        followLoading: false,
        followDone: null,
        followError: null,

        unfollowLoading: false,
        unfollowDone: null,
        unfollowError: null,

        loadFollowersLoading: false,
        loadFollowersDone: null,
        loadFollowersError: null,

        loadFollowingsLoading: false,
        loadFollowingsDone: null,
        loadFollowingsError: null,

        loadToUserLoading: false,
        loadToUserDone: null,
        loadToUserError: null,

        editToMeAllLoading: false,
        editToMeAllDone: null,
        editToMeAllError: null,

        editToMePasswordLoading: false,
        editToMePasswordDone: null,
        editToMePasswordError: null,

        signOutLoading: false,
        signOutDone: null,
        signOutError: null,
      };

    // 2022/01/15 - 특정 유저의 팔로워/팔로잉 정보 초기화 - by 1-blue
    case RESET_FOLLOW:
      return {
        ...prevState,
        Followers: null,
        Followings: null,
      };

    // 2022/01/15 - 로그인한 유저 정보 요청 - by 1-blue
    case LOAD_TO_ME_REQUEST:
      return {
        ...prevState,
        loadToMeLoading: true,
        loadToMeDone: null,
        loadToMeError: null,
      };
    case LOAD_TO_ME_SUCCESS:
      if (action.data.me === null) {
        tempMe = {};
      } else {
        tempMe = {
          ...prevState.me,
          ...action.data.user,
        };
      }
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeDone: action.data.message,
        me: tempMe,
      };
    case LOAD_TO_ME_FAILURE:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeError: action?.data?.message,
      };

    // 2022/01/15 - 회원가입 - by 1-blue
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

    // 2022/01/19 - 팔로우 - 1-blue
    case FOLLOW_REQUEST:
      return {
        ...prevState,
        followLoading: true,
        followDone: null,
        followError: null,
      };
    case FOLLOW_SUCCESS:
      // 2022/01/19 - 나의 팔로잉 추가 ( 팔로우 ) - by 1-blue
      tempMe = {
        ...prevState.me,
        Followings: [...prevState.me.Followings, { _id: action.data.followingId }],
      };

      // 2022/01/19 - 본인 정보창에서 팔로우를 누를 경우 숫자를 증가시키기 위함 - by 1-blue
      if (prevState.user) {
        if (prevState.me._id === prevState.user?._id) {
          tempFollowers = [...prevState.user.Followers];
          tempFollowings = [...prevState.user.Followings, { _id: action.data.followingId }];
        } else {
          tempFollowers = [...prevState.user.Followers, { _id: action.data.followerId }];
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
        followDone: action.data.message,

        // 2022/01/19 - 특정 유저 팔로우 (나의 팔로워) - by 1-blue
        me: tempMe,

        // 2021/12/31 - 특정 유저 팔로우 (특정 유저의 팔로잉) - by 1-blue
        user: tempUser,
      };
    case FOLLOW_FAILURE:
      return {
        ...prevState,
        followLoading: false,
        followError: action.data.message,
      };

    // 2022/01/15 - 언팔로우 - by 1-blue
    case UNFOLLOW_REQUEST:
      return {
        ...prevState,
        unfollowLoading: true,
        unfollowDone: null,
        unfollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      // 2022/01/19 - 나의 팔로잉 제거 ( 언팔로우 ) - by 1-blue
      tempMe = {
        ...prevState.me,
        Followings: prevState.me.Followings.filter(following => following._id !== action.data.unfollowingId),
      };

      // 2021/12/31 - 본인 정보창에서 언팔로우를 누를 경우 숫자를 감소시키기 위함 - by 1-blue
      if (prevState.user) {
        if (prevState.me._id === prevState.user._id) {
          tempFollowers = [...prevState.user.Followers];
          tempFollowings = prevState.user.Followings.filter(following => following._id !== action.data.unfollowingId);
        } else {
          tempFollowers = prevState.user.Followers.filter(follower => follower._id !== action.data.unfollowerId);
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
        unfollowDone: action.data.message,

        // 2021/12/30 - 특정 유저 언팔로우 (나의 언팔로우) - by 1-blue
        me: {
          ...prevState.me,
          Followings: prevState.me.Followings.filter(following => following._id !== action.data.Follow.unfollowingId),
        },

        // 2021/12/31 - 특정 유저 팔로우 (특정 유저의 언팔로잉) - by 1-blue
        user: tempUser,
      };
    case UNFOLLOW_FAILURE:
      return {
        ...prevState,
        unfollowLoading: false,
        unfollowError: action.data.message,
      };

    // 2022/01/15 - 특정 유저 팔로워들 정보 요청 - by 1-blue
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

    // 2022/01/15 - 특정 유저 팔로잉들 정보 요청 - by 1-blue
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

    // 2022/01/15 - 특정 유저 정보 요청 - by 1-blue
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

    // 2022/01/15 - 로그인한 유저의 상세정보 가져오기 - by 1-blue
    case LOAD_TO_ME_DETAIL_REQUEST:
      return {
        ...prevState,
        loadToMeDetailLoading: true,
        loadToMeDetailDone: null,
        loadToMeDetailError: null,
      };
    case LOAD_TO_ME_DETAIL_SUCCESS:
      return {
        ...prevState,
        loadToMeDetailLoading: false,
        loadToMeDetailDone: action.data.message,
        me: {
          ...prevState.me,
          ...action.data.me,
        },
      };
    case LOAD_TO_ME_DETAIL_FAILURE:
      return {
        ...prevState,
        loadToMeDetailLoading: false,
        loadToMeDetailError: action.data.message,
      };

    // 2022/01/15 - 로그인한 유저의 기본정보 변경 - by 1-blue
    case EDIT_TO_ME_ALL_REQUEST:
      return {
        ...prevState,
        editToMeAllLoading: true,
        editToMeAllDone: null,
        editToMeAllError: null,
      };
    case EDIT_TO_ME_ALL_SUCCESS:
      const { name, phone, birthday, profileImage } = action.data.result;

      return {
        ...prevState,
        editToMeAllLoading: false,
        editToMeAllDone: action.data.message,
        me: {
          ...prevState.me,
          name,
          phone,
          birthday,
          Images: profileImage ? [{ name: profileImage }] : [...prevState.me.Images],
        },
      };
    case EDIT_TO_ME_ALL_FAILURE:
      return {
        ...prevState,
        editToMeAllLoading: false,
        editToMeAllError: action.data.message,
      };

    // 2022/01/15 - 로그인한 유저의 비밀번호 변경 - by 1-blue
    case EDIT_TO_ME_PASSWORD_REQUEST:
      return {
        ...prevState,
        editToMePasswordLoading: true,
        editToMePasswordDone: null,
        editToMePasswordError: null,
      };
    case EDIT_TO_ME_PASSWORD_SUCCESS:
      return {
        ...prevState,
        editToMePasswordLoading: false,
        editToMePasswordDone: action.data.message,
      };
    case EDIT_TO_ME_PASSWORD_FAILURE:
      return {
        ...prevState,
        editToMePasswordLoading: false,
        editToMePasswordError: action.data.message,
      };

    // 2022/01/15 - 로그인한 유저의 회원탈퇴 - by 1-blue
    case SIGN_OUT_REQUEST:
      return {
        ...prevState,
        signOutLoading: true,
        signOutDone: null,
        signOutError: null,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...prevState,
        signOutLoading: false,
        signOutDone: action.data.message,
        me: {},
      };
    case SIGN_OUT_FAILURE:
      return {
        ...prevState,
        signOutLoading: false,
        signOutError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default userReducer;
