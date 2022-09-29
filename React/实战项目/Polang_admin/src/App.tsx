import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import Sider from "./Sider";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import "./config/i18";
import { useTranslation } from "react-i18next";

const One = React.lazy(() => import("./pages/One"));
const Two = React.lazy(() => import("./pages/Two"));
const Three = React.lazy(() => import("./pages/Three"));

export default function App() {
  // const update = useUpdate();
  const { t, i18n } = useTranslation();
  return (
    <>
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
    </>
  );
}
