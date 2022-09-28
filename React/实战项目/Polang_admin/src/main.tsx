import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
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
    <Router>
      <div id="slider">
        <h1>Hello world</h1>
        <Link to={`/one`}>one</Link> |<Link to={`/two`}>two</Link> |
        <Link to={`/three`}>three</Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Provider store={store}>
            <Route path="/one" element={<One />} />
            <Route path="/two" element={<Two />} />
            <Route path="/three" element={<Three />} />
          </Provider>
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
