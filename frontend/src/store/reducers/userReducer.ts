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
  LOAD_TO_USER_REQUEST,
  LOAD_TO_USER_SUCCESS,
  LOAD_TO_USER_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_ME_DETAIL_REQUEST,
  LOAD_ME_DETAIL_SUCCESS,
  LOAD_ME_DETAIL_FAILURE,
  EDIT_ACCOUNT_REQUEST,
  EDIT_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT_FAILURE,
  EDIT_PASSWORD_REQUEST,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from "@src/store/types";
import type { UserActionRequest } from "../actions";
import type {
  Photo,
  SimpleUser,
  User,
  UserWithPostAndFollowerAndFollowing,
} from "@src/type";

export type UserStateType = {
  user: UserWithPostAndFollowerAndFollowing | null;

  Followers: SimpleUser[] | null;
  Followings: SimpleUser[] | null;

  me: UserWithPostAndFollowerAndFollowing | null;
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

  loadToUserLoading: boolean;
  loadToUserDone: null | string;
  loadToUserError: null;

  loadFollowersLoading: boolean;
  loadFollowersDone: null | string;
  loadFollowersError: null;

  loadFollowingsLoading: boolean;
  loadFollowingsDone: null | string;
  loadFollowingsError: null;

  detailMe: (User & { Photos?: Photo[] }) | null;
  loadMeDetailLoading: boolean;
  loadMeDetailDone: null | string;
  loadMeDetailError: null;

  editAccountLoading: boolean;
  editAccountDone: null | string;
  editAccountError: null;

  editPasswordLoading: boolean;
  editPasswordDone: null | string;
  editPasswordError: null;

  signOutLoading: boolean;
  signOutDone: null | string;
  signOutError: null;
};

const initState: UserStateType = {
  // 2022/05/21 - 특정 유저 정보를 저장할 변수 - by 1-blue
  user: null,

  // 2022/05/26 - 특정 유저의 팔로워/팔로잉 정보 - by 1-blue
  Followers: null,
  Followings: null,

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

  // 2022/05/26 - 특정 유저 정보 변수 - by 1-blue
  loadToUserLoading: false,
  loadToUserDone: null,
  loadToUserError: null,

  // 2022/05/26 - 특정 유저의 팔로워들 변수 - by 1-blue
  loadFollowersLoading: false,
  loadFollowersDone: null,
  loadFollowersError: null,

  // 2022/05/26 - 특정 유저의 팔로잉들 변수 - by 1-blue
  loadFollowingsLoading: false,
  loadFollowingsDone: null,
  loadFollowingsError: null,

  // 2022/06/02 - 로그인한 유저 상세 정보 변수 - by 1-blue
  detailMe: null,
  loadMeDetailLoading: false,
  loadMeDetailDone: null,
  loadMeDetailError: null,

  // 2022/06/02 - 로그인한 유저 기본 정보 변경 변수 - by 1-blue
  editAccountLoading: false,
  editAccountDone: null,
  editAccountError: null,

  // 2022/06/02 - 로그인한 유저 비밀번호 변경 변수 - by 1-blue
  editPasswordLoading: false,
  editPasswordDone: null,
  editPasswordError: null,

  // 2022/06/02 - 로그인한 유저 회원 탈퇴 변수 - by 1-blue
  signOutLoading: false,
  signOutDone: null,
  signOutError: null,
};

function userReducer(prevState = initState, action: UserActionRequest) {
  let tempMe: null | UserWithPostAndFollowerAndFollowing = null;
  let tempUser: null | UserWithPostAndFollowerAndFollowing = null;
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

        loadToUserLoading: false,
        loadToUserDone: null,
        loadToUserError: null,

        loadFollowersLoading: false,
        loadFollowersDone: null,
        loadFollowersError: null,

        loadFollowingsLoading: false,
        loadFollowingsDone: null,
        loadFollowingsError: null,

        loadMeDetailLoading: false,
        loadMeDetailDone: null,
        loadMeDetailError: null,

        editAccountLoading: false,
        editAccountDone: null,
        editAccountError: null,

        editPasswordLoading: false,
        editPasswordDone: null,
        editPasswordError: null,

        signOutLoading: false,
        signOutDone: null,
        signOutError: null,
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
        followError: action.data.message,
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
        unfollowError: action.data.message,
      };

    // 2022/05/26 - 특정 유저의 정보 요청 - by 1-blue
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
        loadToUserDone: action.data?.message,
        user: action.data.user,
      };
    case LOAD_TO_USER_FAILURE:
      return {
        ...prevState,
        loadToUserLoading: false,
        loadToUserError: action.data.message,
      };

    // 2022/05/26 - 특정 유저의 팔로워들 요청 - by 1-blue
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
        loadFollowersDone: action.data?.message,
        Followers: action.data.followers,
      };
    case LOAD_FOLLOWERS_FAILURE:
      return {
        ...prevState,
        loadFollowersLoading: false,
        loadFollowersError: action.data.message,
      };

    // 2022/05/26 - 특정 유저의 팔로워들 요청 - by 1-blue
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
        loadFollowingsDone: action.data?.message,
        Followings: action.data.followings,
      };
    case LOAD_FOLLOWINGS_FAILURE:
      return {
        ...prevState,
        loadFollowingsLoading: false,
        loadFollowingsError: action.data.message,
      };

    // 2022/06/02 - 유저 상세 정보 요청 - by 1-blue
    case LOAD_ME_DETAIL_REQUEST:
      return {
        ...prevState,
        loadMeDetailLoading: true,
        loadMeDetailDone: null,
        loadMeDetailError: null,
      };
    case LOAD_ME_DETAIL_SUCCESS:
      return {
        ...prevState,
        loadMeDetailLoading: false,
        loadMeDetailDone: action.data?.message,
        detailMe: action.data.me,
      };
    case LOAD_ME_DETAIL_FAILURE:
      return {
        ...prevState,
        loadMeDetailLoading: false,
        loadMeDetailError: action.data.message,
      };

    // 2022/06/02 - 유저 기본 정보 변경 요청 - by 1-blue
    case EDIT_ACCOUNT_REQUEST:
      return {
        ...prevState,
        editAccountLoading: true,
        editAccountDone: null,
        editAccountError: null,
      };
    case EDIT_ACCOUNT_SUCCESS:
      return {
        ...prevState,
        editAccountLoading: false,
        editAccountDone: action.data?.message,
      };
    case EDIT_ACCOUNT_FAILURE:
      return {
        ...prevState,
        editAccountLoading: false,
        editAccountError: action.data.message,
      };

    // 2022/06/02 - 유저 비밀번호 변경 요청 - by 1-blue
    case EDIT_PASSWORD_REQUEST:
      return {
        ...prevState,
        editPasswordLoading: true,
        editPasswordDone: null,
        editPasswordError: null,
      };
    case EDIT_PASSWORD_SUCCESS:
      return {
        ...prevState,
        editPasswordLoading: false,
        editPasswordDone: action.data?.message,
      };
    case EDIT_PASSWORD_FAILURE:
      return {
        ...prevState,
        editPasswordLoading: false,
        editPasswordError: action.data.message,
      };

    // 2022/06/02 - 유저 회원 탈퇴 요청 - by 1-blue
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
        signOutDone: action.data?.message,
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
