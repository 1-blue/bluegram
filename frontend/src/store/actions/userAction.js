import { LOAD_TO_ME_REQUEST, SIGNUP_REQUEST, LOAD_TO_USER_REQUEST, LOAD_TO_ME_DETAIL_REQUEST } from "@store/types";

// 2021/12/20 - 로그인한 유저 정보 요청 액션 크리에이터 - by 1-blue
export function loadToMeAction(data) {
  return {
    type: LOAD_TO_ME_REQUEST,
    data,
  };
}

// 2021/12/20 - 회원가입 요청 액션 크리에이터 - by 1-blue
export function signupAction(data) {
  return {
    type: SIGNUP_REQUEST,
    data,
  };
}

// 2021/12/20 - 회원가입 요청 액션 크리에이터 - by 1-blue
export function loadToUserAction(data) {
  return {
    type: LOAD_TO_USER_REQUEST,
    data,
  };
}

// 2022/01/02 - 로그인한 유저의 상세정보 가져오기 - by 1-blue
export function loadToMeDetailAction(data) {
  return {
    type: LOAD_TO_ME_DETAIL_REQUEST,
    data,
  };
}
