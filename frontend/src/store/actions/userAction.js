import { LOAD_TO_ME_REQUEST, SIGNUP_REQUEST } from "@store/types";

// 로그인한 유저 정보 요청 액션 크리에이터
export function loadToMeAction(data) {
  return {
    type: LOAD_TO_ME_REQUEST,
    data,
  };
}

// 회원가입 요청 액션 크리에이터
export function signupAction(data) {
  return {
    type: SIGNUP_REQUEST,
    data,
  };
}
