import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import imageReducer from "./imageReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  image: imageReducer,
});

export default rootReducer;
