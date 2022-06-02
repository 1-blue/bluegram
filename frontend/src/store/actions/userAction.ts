import {
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LOAD_TO_ME_FAILURE,
  LoadToMeResponse,
  FollowResponse,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  FollowBody,
  UnfollowBody,
  UnfollowResponse,
  FailureResponse,
  LoadFollowersBody,
  LoadFollowingsResponse,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LoadFollowersResponse,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LoadFollowingsBody,
  LOAD_TO_USER_REQUEST,
  LOAD_TO_USER_SUCCESS,
  LOAD_TO_USER_FAILURE,
  LoadToUserBody,
  LoadToUserResponse,
  LoadMeDetailBody,
  LoadMeDetailResponse,
  LOAD_ME_DETAIL_REQUEST,
  LOAD_ME_DETAIL_SUCCESS,
  LOAD_ME_DETAIL_FAILURE,
  EditAccountBody,
  EditAccountResponse,
  EDIT_ACCOUNT_REQUEST,
  EDIT_ACCOUNT_SUCCESS,
  EDIT_ACCOUNT_FAILURE,
  EditPasswordBody,
  EditPasswordResponse,
  EDIT_PASSWORD_REQUEST,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_FAILURE,
  SignOutBody,
  SignOutResponse,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from "@src/store/types";
import { resetMessage } from ".";

// 2022/05/07 - 본인 정보 요청 액션 크리에이터 - by 1-blue
export const loadToMeRequest = () => ({ type: LOAD_TO_ME_REQUEST });
export const loadToMeSuccess = (data: LoadToMeResponse) => ({
  type: LOAD_TO_ME_SUCCESS,
  data,
});
export const loadToMeFailure = () => ({ type: LOAD_TO_ME_FAILURE });

// 2022/05/21 - 팔로우 요청 액션 크리에이터 - by 1-blue
export const followRequest = (data: FollowBody) => ({
  type: FOLLOW_REQUEST,
  data,
});
export const followSuccess = (data: FollowResponse) => ({
  type: FOLLOW_SUCCESS,
  data,
});
export const followFailure = (data: FailureResponse) => ({
  type: FOLLOW_FAILURE,
  data,
});
// 2022/05/21 - 언팔로우 요청 액션 크리에이터 - by 1-blue
export const unfollowRequest = (data: UnfollowBody) => ({
  type: UNFOLLOW_REQUEST,
  data,
});
export const unfollowSuccess = (data: UnfollowResponse) => ({
  type: UNFOLLOW_SUCCESS,
  data,
});
export const unfollowFailure = (data: FailureResponse) => ({
  type: UNFOLLOW_FAILURE,
  data,
});

// 2022/05/26 - 특정 유저의 팔로잉들 요청 액션 크리에이터 - by 1-blue
export const loadToUserRequest = (data: LoadToUserBody) => ({
  type: LOAD_TO_USER_REQUEST,
  data,
});
export const loadToUserSuccess = (data: LoadToUserResponse) => ({
  type: LOAD_TO_USER_SUCCESS,
  data,
});
export const loadToUserFailure = (data: FailureResponse) => ({
  type: LOAD_TO_USER_FAILURE,
  data,
});

// 2022/05/26 - 특정 유저의 팔로워들 요청 액션 크리에이터 - by 1-blue
export const loadFollowersRequest = (data: LoadFollowersBody) => ({
  type: LOAD_FOLLOWERS_REQUEST,
  data,
});
export const loadFollowersSuccess = (data: LoadFollowersResponse) => ({
  type: LOAD_FOLLOWERS_SUCCESS,
  data,
});
export const loadFollowersFailure = (data: FailureResponse) => ({
  type: LOAD_FOLLOWERS_FAILURE,
  data,
});

// 2022/05/26 - 특정 유저의 팔로잉들 요청 액션 크리에이터 - by 1-blue
export const loadFollowingsRequest = (data: LoadFollowingsBody) => ({
  type: LOAD_FOLLOWINGS_REQUEST,
  data,
});
export const loadFollowingsSuccess = (data: LoadFollowingsResponse) => ({
  type: LOAD_FOLLOWINGS_SUCCESS,
  data,
});
export const loadFollowingsFailure = (data: FailureResponse) => ({
  type: LOAD_FOLLOWINGS_FAILURE,
  data,
});

// 2022/06/02 - 로그인한 유저 상세 정보 요청 액션 크리에이터 - by 1-blue
export const loadMeDetailRequest = (data: LoadMeDetailBody) => ({
  type: LOAD_ME_DETAIL_REQUEST,
  data,
});
export const loadMeDetailSuccess = (data: LoadMeDetailResponse) => ({
  type: LOAD_ME_DETAIL_SUCCESS,
  data,
});
export const loadMeDetailFailure = (data: FailureResponse) => ({
  type: LOAD_ME_DETAIL_FAILURE,
  data,
});

// 2022/06/02 - 로그인한 유저 기본 정보 변경 요청 액션 크리에이터 - by 1-blue
export const editAccountRequest = (data: EditAccountBody) => ({
  type: EDIT_ACCOUNT_REQUEST,
  data,
});
export const editAccountSuccess = (data: EditAccountResponse) => ({
  type: EDIT_ACCOUNT_SUCCESS,
  data,
});
export const editAccountFailure = (data: FailureResponse) => ({
  type: EDIT_ACCOUNT_FAILURE,
  data,
});

// 2022/06/02 - 로그인한 유저 비밀번호 변경 요청 액션 크리에이터 - by 1-blue
export const editPasswordRequest = (data: EditPasswordBody) => ({
  type: EDIT_PASSWORD_REQUEST,
  data,
});
export const editPasswordSuccess = (data: EditPasswordResponse) => ({
  type: EDIT_PASSWORD_SUCCESS,
  data,
});
export const editPasswordFailure = (data: FailureResponse) => ({
  type: EDIT_PASSWORD_FAILURE,
  data,
});

// 2022/06/02 - 로그인한 유저 회원 탈퇴 요청 액션 크리에이터 - by 1-blue
export const signOutRequest = (data: SignOutBody) => ({
  type: SIGN_OUT_REQUEST,
  data,
});
export const signOutSuccess = (data: SignOutResponse) => ({
  type: SIGN_OUT_SUCCESS,
  data,
});
export const signOutFailure = (data: FailureResponse) => ({
  type: SIGN_OUT_FAILURE,
  data,
});

export type UserActionRequest =
  | ReturnType<typeof resetMessage>
  | ReturnType<typeof loadToMeRequest>
  | ReturnType<typeof loadToMeSuccess>
  | ReturnType<typeof loadToMeFailure>
  | ReturnType<typeof followRequest>
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof followFailure>
  | ReturnType<typeof unfollowRequest>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof unfollowFailure>
  | ReturnType<typeof loadToUserRequest>
  | ReturnType<typeof loadToUserSuccess>
  | ReturnType<typeof loadToUserFailure>
  | ReturnType<typeof loadFollowersRequest>
  | ReturnType<typeof loadFollowersSuccess>
  | ReturnType<typeof loadFollowersFailure>
  | ReturnType<typeof loadFollowingsRequest>
  | ReturnType<typeof loadFollowingsSuccess>
  | ReturnType<typeof loadFollowingsFailure>
  | ReturnType<typeof loadMeDetailRequest>
  | ReturnType<typeof loadMeDetailSuccess>
  | ReturnType<typeof loadMeDetailFailure>
  | ReturnType<typeof editAccountRequest>
  | ReturnType<typeof editAccountSuccess>
  | ReturnType<typeof editAccountFailure>
  | ReturnType<typeof editPasswordRequest>
  | ReturnType<typeof editPasswordSuccess>
  | ReturnType<typeof editPasswordFailure>
  | ReturnType<typeof signOutRequest>
  | ReturnType<typeof signOutSuccess>
  | ReturnType<typeof signOutFailure>;
