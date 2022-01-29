import { LOCAL_LOGIN_REQUEST, LOCAL_LOGOUT_REQUEST } from "@store/types";

// 2021/12/20 - 로컬 로그인 액션 크리에이터 - by 1-blue
export const localLoginAction = data => ({ type: LOCAL_LOGIN_REQUEST, data });

// 2021/12/20 - 로컬 로그아웃 액션 크리에이터 - by 1-blue
export const localLogoutAction = data => ({ type: LOCAL_LOGOUT_REQUEST, data });
