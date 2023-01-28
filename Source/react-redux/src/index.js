import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import store from "./pages/store/index";
import { Provider } from "./use";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
