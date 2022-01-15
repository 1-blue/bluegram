import {
  LOAD_TO_ME_REQUEST,
  SIGNUP_REQUEST,
  LOAD_TO_USER_REQUEST,
  LOAD_TO_ME_DETAIL_REQUEST,
  EDIT_TO_ME_ALL_REQUEST,
  EDIT_TO_ME_PASSWORD_REQUEST,
  SIGN_OUT_REQUEST,
} from "@store/types";

// 2021/12/20 - 로그인한 유저 정보 요청 액션 크리에이터 - by 1-blue
export const loadToMeAction = data => ({ type: LOAD_TO_ME_REQUEST, data });

// 2021/12/20 - 회원가입 요청 액션 크리에이터 - by 1-blue
export const signupAction = data => ({ type: SIGNUP_REQUEST, data });

// 2021/12/20 - 회원가입 요청 액션 크리에이터 - by 1-blue
export const loadToUserAction = data => ({ type: LOAD_TO_USER_REQUEST, data });

// 2022/01/02 - 로그인한 유저의 상세정보 가져오기 - by 1-blue
export const loadToMeDetailAction = data => ({ type: LOAD_TO_ME_DETAIL_REQUEST, data });

// 2022/01/03 - 로그인한 유저의 기본정보 변경 - by 1-blue
export const editToMeAllAction = data => ({ type: EDIT_TO_ME_ALL_REQUEST, data });

// 2022/01/03 - 로그인한 유저의 비밀번호 변경 - by 1-blue
export const editToMePasswordAction = data => ({ type: EDIT_TO_ME_PASSWORD_REQUEST, data });

// 2022/01/03 - 로그인한 유저의 회원탈퇴 - by 1-blue
export const signOutAction = data => ({ type: SIGN_OUT_REQUEST, data });
