import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  EditAccountBody,
  EditAccountResponse,
  EditPasswordBody,
  EditPasswordResponse,
  FollowBody,
  FollowResponse,
  LoadFollowersBody,
  LoadFollowersResponse,
  LoadFollowingsBody,
  LoadFollowingsResponse,
  LoadToMeDetailResponse,
  LoadToMeResponse,
  LoadToUserBody,
  LoadToUserResponse,
  ResponseFailure,
  SignOutBody,
  SignOutResponse,
  UnfollowBody,
  UnfollowResponse,
} from "@src/store/types";
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
  loadToMeDone: null | string;
  loadToMeError: null | string;

  logoutLoading: boolean;
  logoutDone: null | string;
  logoutError: null | string;

  signUpLoading: boolean;
  signUpDone: null | string;
  signUpError: null | string;

  followLoading: boolean;
  followDone: null | string;
  followError: null | string;
  unfollowLoading: boolean;
  unfollowDone: null | string;
  unfollowError: null | string;

  loadToUserLoading: boolean;
  loadToUserDone: null | string;
  loadToUserError: null | string;

  loadFollowersLoading: boolean;
  loadFollowersDone: null | string;
  loadFollowersError: null | string;

  loadFollowingsLoading: boolean;
  loadFollowingsDone: null | string;
  loadFollowingsError: null | string;

  detailMe: (User & { Photos?: Photo[] }) | null;
  loadToMeDetailLoading: boolean;
  loadToMeDetailDone: null | string;
  loadToMeDetailError: null | string;

  editAccountLoading: boolean;
  editAccountDone: null | string;
  editAccountError: null | string;

  editPasswordLoading: boolean;
  editPasswordDone: null | string;
  editPasswordError: null | string;

  signOutLoading: boolean;
  signOutDone: null | string;
  signOutError: null | string;
};

const initialState: UserStateType = {
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
  loadToMeDetailLoading: false,
  loadToMeDetailDone: null,
  loadToMeDetailError: null,

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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage(state) {
      state.loadToMeLoading = false;
      state.loadToMeDone = null;
      state.loadToMeError = null;
      state.logoutLoading = false;
      state.logoutDone = null;
      state.logoutError = null;
      state.signUpLoading = false;
      state.signUpDone = null;
      state.signUpError = null;
      state.followLoading = false;
      state.followDone = null;
      state.followError = null;
      state.unfollowLoading = false;
      state.unfollowDone = null;
      state.unfollowError = null;
      state.loadToUserLoading = false;
      state.loadToUserDone = null;
      state.loadToUserError = null;
      state.loadFollowersLoading = false;
      state.loadFollowersDone = null;
      state.loadFollowersError = null;
      state.loadFollowingsLoading = false;
      state.loadFollowingsDone = null;
      state.loadFollowingsError = null;
      state.loadToMeDetailLoading = false;
      state.loadToMeDetailDone = null;
      state.loadToMeDetailError = null;
      state.editAccountLoading = false;
      state.editAccountDone = null;
      state.editAccountError = null;
      state.editPasswordLoading = false;
      state.editPasswordDone = null;
      state.editPasswordError = null;
      state.signOutLoading = false;
      state.signOutDone = null;
      state.signOutError = null;
    },

    // 2022/07/02 - 본인 정보 패치 - by 1-blue
    loadToMeRequest(state) {
      state.loadToMeLoading = true;
      state.loadToMeDone = null;
      state.loadToMeError = null;
    },
    loadToMeSuccess(state, action: PayloadAction<LoadToMeResponse>) {
      state.loadToMeLoading = false;
      state.loadToMeDone = action.payload.data.message;
      state.me = action.payload.data.user;
    },
    loadToMeFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadToMeLoading = false;
      state.loadToMeError = action.payload.data.message;
    },
    // 2022/07/02 - 본인의 상세 정보 패치 - by 1-blue
    loadToMeDetailRequest(state) {
      state.loadToMeDetailLoading = true;
      state.loadToMeDetailDone = null;
      state.loadToMeDetailError = null;
    },
    loadToMeDetailSuccess(
      state,
      action: PayloadAction<LoadToMeDetailResponse>
    ) {
      state.loadToMeDetailLoading = false;
      state.loadToMeDetailDone = action.payload.data.message;
      state.detailMe = action.payload.data.me;
    },
    loadToMeDetailFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadToMeDetailLoading = false;
      state.loadToMeDetailError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 유저의 정보 패치 - by 1-blue
    loadToUserRequest(state, action: PayloadAction<LoadToUserBody>) {
      state.loadToUserLoading = true;
      state.loadToUserDone = null;
      state.loadToUserError = null;
    },
    loadToUserSuccess(state, action: PayloadAction<LoadToUserResponse>) {
      state.loadToUserLoading = false;
      state.loadToUserDone = action.payload.data.message;
      state.user = action.payload.data.user;
    },
    loadToUserFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadToUserLoading = false;
      state.loadToUserError = action.payload.data.message;
    },
    // 2022/07/02 - 본인의 기본 정보 변경 요청 - by 1-blue
    editAccountRequest(state, action: PayloadAction<EditAccountBody>) {
      state.editAccountLoading = true;
      state.editAccountDone = null;
      state.editAccountError = null;
    },
    editAccountSuccess(state, action: PayloadAction<EditAccountResponse>) {
      state.editAccountLoading = false;
      state.editAccountDone = action.payload.data.message;
    },
    editAccountFailure(state, action: PayloadAction<ResponseFailure>) {
      state.editAccountLoading = false;
      state.editAccountError = action.payload.data.message;
    },
    // 2022/07/02 - 본인의 비밀번호 변경 요청 - by 1-blue
    editPasswordRequest(state, action: PayloadAction<EditPasswordBody>) {
      state.editPasswordLoading = true;
      state.editPasswordDone = null;
      state.editPasswordError = null;
    },
    editPasswordSuccess(state, action: PayloadAction<EditPasswordResponse>) {
      state.editPasswordLoading = false;
      state.editPasswordDone = action.payload.data.message;
    },
    editPasswordFailure(state, action: PayloadAction<ResponseFailure>) {
      state.editPasswordLoading = false;
      state.editPasswordError = action.payload.data.message;
    },
    // 2022/07/02 - 본인의 회원 탈퇴 요청 - by 1-blue
    signOutRequest(state, action: PayloadAction<SignOutBody>) {
      state.signOutLoading = true;
      state.signOutDone = null;
      state.signOutError = null;
    },
    signOutSuccess(state, action: PayloadAction<SignOutResponse>) {
      state.signOutLoading = false;
      state.signOutDone = action.payload.data.message;
    },
    signOutFailure(state, action: PayloadAction<ResponseFailure>) {
      state.signOutLoading = false;
      state.signOutError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 유저의 팔로워들 패치 - by 1-blue
    loadFollowersRequest(state, action: PayloadAction<LoadFollowersBody>) {
      state.loadFollowersLoading = true;
      state.loadFollowersDone = null;
      state.loadFollowersError = null;
    },
    loadFollowersSuccess(state, action: PayloadAction<LoadFollowersResponse>) {
      state.loadFollowersLoading = false;
      state.loadFollowersDone = action.payload.data.message;
      state.Followers = action.payload.data.followers;
    },
    loadFollowersFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadFollowersLoading = false;
      state.loadFollowersError = action.payload.data.message;
    },
    // 2022/07/02 - 특정 유저의 팔로잉들 패치 - by 1-blue
    loadFollowingsRequest(state, action: PayloadAction<LoadFollowingsBody>) {
      state.loadFollowingsLoading = true;
      state.loadFollowingsDone = null;
      state.loadFollowingsError = null;
    },
    loadFollowingsSuccess(
      state,
      action: PayloadAction<LoadFollowingsResponse>
    ) {
      state.loadFollowingsLoading = false;
      state.loadFollowingsDone = action.payload.data.message;
      state.Followings = action.payload.data.followings;
    },
    loadFollowingsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadFollowingsLoading = false;
      state.loadFollowingsError = action.payload.data.message;
    },
    // 2022/07/02 - 팔로우 요청 - by 1-blue
    followRequest(state, action: PayloadAction<FollowBody>) {
      state.followLoading = true;
      state.followDone = null;
      state.followError = null;
    },
    followSuccess(state, action: PayloadAction<FollowResponse>) {
      state.followLoading = false;
      state.followDone = action.payload.data.message;

      if (!state.me) return;
      state.me.Followings.push({ _id: action.payload.data.followingId });

      if (!state.user) return;
      if (state.me._id === state.user._id) {
        state.user.Followings.push({ _id: action.payload.data.followingId });
      } else {
        state.user.Followers.push({ _id: action.payload.data.followerId });
      }
    },
    followFailure(state, action: PayloadAction<ResponseFailure>) {
      state.followLoading = false;
      state.followError = action.payload.data.message;
    },
    // 2022/07/02 - 언팔로우 요청 - by 1-blue
    unfollowRequest(state, action: PayloadAction<UnfollowBody>) {
      state.unfollowLoading = true;
      state.unfollowDone = null;
      state.unfollowError = null;
    },
    unfollowSuccess(state, action: PayloadAction<UnfollowResponse>) {
      state.unfollowLoading = false;
      state.unfollowDone = action.payload.data.message;

      if (!state.me) return;
      state.me.Followings.filter(
        (following) => following._id !== action.payload.data.unfollowingId
      );

      if (!state.user) return;
      if (state.me._id === state.user._id) {
        state.user.Followings.filter(
          (following) => following._id !== action.payload.data.unfollowingId
        );
      } else {
        state.user.Followers.filter(
          (follower) => follower._id !== action.payload.data.unfollowerId
        );
      }
    },
    unfollowFailure(state, action: PayloadAction<ResponseFailure>) {
      state.unfollowLoading = false;
      state.unfollowError = action.payload.data.message;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
