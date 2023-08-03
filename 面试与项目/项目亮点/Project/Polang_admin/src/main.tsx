import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Sider from "./Sider";
// import One from "./pages/One";
// import Two from "./pages/Two";
// import Three from "./pages/Three";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import "./config/i18";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
