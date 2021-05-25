import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Count from "./components/Count";
import store from "./store/index"

ReactDOM.render(
  <Provider store={store}>
    <Count />
  </Provider>,
  document.getElementById('root')
)