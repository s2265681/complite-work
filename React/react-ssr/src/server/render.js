import React, { Component, Fragment } from "react";
// import Home from "../containers/Home";
// import Counter from "../containers/Counter";
import { Route, StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import routes from "../router";
// import Header from "../components/Header";
import { Provider } from "react-redux";
import { getServerStore } from "../store";
import { renderRoutes , matchRoutes } from 'react-router-config'

export default function (req, res) {
  let context = {};
  let store = getServerStore(req);
  // 获取要渲染的组件， matchPath是路由提供的工具方法。可以用来判断路径和对象是否匹配
  // matchPath 是路由提供的工具方法，可以用来判断路径和路由对象是否匹配（不是简单的匹配：绝对相等）
  // 这样的也能匹配到
  // req.path   => /user/123456
  // route.path => /user/:id
  // matchRoutes 这个方法可以处理嵌套路由
  let matchedRoutes = matchRoutes(routes, req.path);
//   let matchedRoutes = routes.filter((route) => {
//     return matchPath(req.path, route);
//   });

  let promises = [];
  // 当前匹配到的路由如果需要异步请求数据，那么就在这里请求数据
  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  });
  Promise.all(promises).then(function () {
    // var html = renderToString(<Counter/>)
    var html = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
        
              {/* {routes.map((route, index) => (
                <Route {...route} key={index} />
              ))} */}
              {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    res.send(`
            <html>
                <head>
                <title>React-SSR</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
                </head>
                <body>
                <div id="root">${html}</div>
                <script>
                    window.context={
                        state:${JSON.stringify(store.getState())}
                    }
                </script>
                <script src="/client.js"></script>
                </body>
            </html>`);
  });
}
