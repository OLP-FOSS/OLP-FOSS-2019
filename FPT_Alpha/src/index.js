import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import App from "./containers/app";
import reducers from "./reducers";
const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducers, applyMiddleware(...middleware));
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
