import React, { Component, Fragment } from "react";
// import Home from "../containers/Home";
// import Counter from "../containers/Counter";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import routes from "../router";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { getServerStore } from "../store";

export default function (req, res) {
  // var html = renderToString(<Counter/>)
  var html = renderToString(
    <Provider store={getServerStore(req)}>
      <StaticRouter context={{}} location={req.path}>
        <Fragment>
          <Header />
          <div className="container" style={{ marginTop: 70 }}>
            {routes}
          </div>
        </Fragment>
      </StaticRouter>
    </Provider>
  );
  console.log(html);
  res.send(`
    <html>
        <head>
        <title>React-SSR</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
        </head>
        <body>
        <div id="root">${html}</div>
        <script></script>
        <script src="/client.js"></script>
        </body>
    </html>`);
}
