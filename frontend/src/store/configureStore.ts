import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

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
