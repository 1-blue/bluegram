import { LOGIN_REQUEST } from "@store/types";

// 로그인 액션 크리에이터
export function loginAction(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}
