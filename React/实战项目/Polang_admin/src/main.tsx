import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./index.css";
// import App from "./App";
import Sider from "./Sider";
// import One from "./pages/One";
// import Two from "./pages/Two";
// import Three from "./pages/Three";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

const One = React.lazy(() => import("./pages/One"));
const Two = React.lazy(() => import("./pages/Two"));
const Three = React.lazy(() => import("./pages/Three"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Sider />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/one" element={<One />} />
            <Route path="/two" element={<Two />} />
            <Route path="/three" element={<Three />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);
