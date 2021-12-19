import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// css
import "@css/reset.css";
import "@css/common.css";

// components
import App from "./App";

// store
import store from "@store/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root"),
);
