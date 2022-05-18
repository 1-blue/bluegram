import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";
import userReducer, { UserStateType } from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default:
      const combinedReducer = combineReducers({
        auth: authReducer,
        user: userReducer,
        post: postReducer,
      });
      return combinedReducer(state, action);
  }
};

export default rootReducer;

export type AuthState = ReturnType<typeof authReducer>;
export type UserState = UserStateType;
export type PostState = ReturnType<typeof postReducer>;
