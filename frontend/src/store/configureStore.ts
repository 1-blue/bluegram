import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

// reducers
// import authReducer from "./reducers/authReducer";
// import chatReducer from "./reducers/chatReducer";
// import postReducer from "./reducers/postReducer";
// import userReducer from "./reducers/userReducer";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

// const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware();
//   const middlewares = [sagaMiddleware];
//   const enhancer =
//     process.env.NEXT_PUBLIC_NODE_ENV === "production"
//       ? compose(applyMiddleware(...middlewares))
//       : composeWithDevTools(applyMiddleware(...middlewares));

//   const store = createStore(rootReducer, enhancer);
//   store.sagaTask = sagaMiddleware.run(rootSaga);

//   return store;
// };

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: process.env.NEXT_PUBLIC_NODE_ENV === "development",
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(createStore, {
  debug: process.env.NEXT_PUBLIC_NODE_ENV === "development",
});

const store = createStore();
export type RootState = ReturnType<typeof store.getState>;

export default wrapper;
