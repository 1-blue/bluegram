import { RESET_MESSAGE } from "../types";

export const resetMessage = () => ({
  type: RESET_MESSAGE,
});

export {
  localLoginRequest,
  localLoginSuccess,
  localLoginFailure,
  localLogoutRequest,
  localLogoutSuccess,
  localLogoutFailure,
} from "./authAction";
export type { AuthActionRequest } from "./authAction";

export {
  loadToMeRequest,
  loadToMeSuccess,
  loadToMeFailure,
} from "./userAction";
export type { UserActionRequest } from "./userAction";

export {
  openWriteModalRequest,
  closeWriteModalRequest,
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
} from "./postAction";
export type { PostActionRequest } from "./postAction";
