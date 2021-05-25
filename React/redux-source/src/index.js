import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { Provider } from "./react-redux/index";
import { Provider } from "./react-redux";

import Count1 from "./components/Count1";
import Count2 from "./components/Count2";
import store from "./store/index"
// import Context from './components/Context'

ReactDOM.render(
  <Provider store={store}>
    <Count1 />
    <hr/>
    <Count2 />
  </Provider>,
  document.getElementById('root')
)