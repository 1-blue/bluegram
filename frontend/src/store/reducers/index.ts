import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default:
      const combinedReducer = combineReducers({
        auth: authReducer,
      });
      return combinedReducer(state, action);
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export type AuthState = ReturnType<typeof authReducer>;
