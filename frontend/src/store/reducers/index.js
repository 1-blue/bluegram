import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import imageReducer from "./imageReducer";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default:
      const combinedReducer = combineReducers({
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        image: imageReducer,
      });
      return combinedReducer(state, action);
  }
};

export default rootReducer;
