import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import routes from "../router";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { getClientStore } from "../store";
import { renderRoutes , matchRoutes } from 'react-router-config'

ReactDOM.hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>
            {/* {routes.map((route,index)=>(
                <Route {...route} key={index}/>
            ))} */}
            {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
