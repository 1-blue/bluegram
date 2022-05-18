import {
  LOAD_TO_ME_REQUEST,
  LOAD_TO_ME_SUCCESS,
  LOAD_TO_ME_FAILURE,
  LoadToMeResponse,
} from "@src/store/types";
import { resetMessage } from ".";

// 2022/05/07 - 본인 정보 요청 액션 크리에이터 - by 1-blue
export const loadToMeRequest = () => ({ type: LOAD_TO_ME_REQUEST });
export const loadToMeSuccess = (data: LoadToMeResponse) => ({
  type: LOAD_TO_ME_SUCCESS,
  data,
});
export const loadToMeFailure = () => ({ type: LOAD_TO_ME_FAILURE });

export type UserActionRequest =
  | ReturnType<typeof resetMessage>
  | ReturnType<typeof loadToMeRequest>
  | ReturnType<typeof loadToMeSuccess>
  | ReturnType<typeof loadToMeFailure>;
