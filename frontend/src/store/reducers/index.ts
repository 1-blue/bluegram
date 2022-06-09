import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import chatReducer from "./chatReducer";

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default:
      const combinedReducer = combineReducers({
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        chat: chatReducer,
      });
      return combinedReducer(state, action);
  }
};

export default rootReducer;

export type AuthState = ReturnType<typeof authReducer>;
export type UserState = ReturnType<typeof userReducer>;
export type PostState = ReturnType<typeof postReducer>;
export type ChatState = ReturnType<typeof chatReducer>;
