import { LOCAL_LOGIN_REQUEST, LOCAL_LOGOUT_REQUEST } from "@store/types";

// 2021/12/20 - 로컬 로그인 액션 크리에이터 - by 1-blue
export function localLoginAction(data) {
  return {
    type: LOCAL_LOGIN_REQUEST,
    data,
  };
}

// 2021/12/20 - 로컬 로그아웃 액션 크리에이터 - by 1-blue
export function localLogoutAction(data) {
  return {
    type: LOCAL_LOGOUT_REQUEST,
    data,
  };
}
