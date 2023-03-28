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
declare let __KALO_MACID: any;

const One = React.lazy(() => import("./pages/One"));
const Two = React.lazy(() => import("./pages/Two"));
const Three = React.lazy(() => import("./pages/Three"));
const OpenAi = React.lazy(() => import("./pages/OpenAi"));

export default function App() {
  // const update = useUpdate();
  const { t, i18n } = useTranslation();
  console.log(__KALO_MACID, "__KALO_MACID");
  return (
    <>
      <Provider store={store}>
        机器码：{__KALO_MACID}
        <Router>
          <Sider />
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/one" element={<One />} />
              <Route path="/two" element={<Two />} />
              <Route path="/three" element={<Three />} />
              <Route path="/openAi" element={<OpenAi />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </>
  );
}
