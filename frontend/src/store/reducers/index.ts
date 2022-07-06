import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";
import type { AnyAction, CombinedState } from "@reduxjs/toolkit";

// reducers
import authReducer, { AuthStateType } from "./authReducer";
import userReducer, { UserStateType } from "./userReducer";
import postReducer, { PostStateType } from "./postReducer";
import chatReducer, { ChatStateType } from "./chatReducer";

// actions
export { authActions } from "./authReducer";
export { userActions } from "./userReducer";
export { postActions } from "./postReducer";
export { chatActions } from "./chatReducer";

type ReducerState = {
  auth: AuthStateType;
  post: PostStateType;
  user: UserStateType;
  chat: ChatStateType;
};

const rootReducer = (
  state: any,
  action: AnyAction
): CombinedState<ReducerState> => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return combineReducers({
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        chat: chatReducer,
      })(state, action);
  }
};

export default rootReducer;
