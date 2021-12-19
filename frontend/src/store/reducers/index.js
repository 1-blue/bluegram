import { combineReducers } from "redux";

// reducers
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
