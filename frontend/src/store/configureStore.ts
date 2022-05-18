import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NEXT_PUBLIC_NODE_ENV === "development",
});

export default wrapper;
