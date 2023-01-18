import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store";
// import { Provider } from "react-redux";
import { Provider } from "./package/react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
