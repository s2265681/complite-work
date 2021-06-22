import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import routes from "../router";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { getClientStore } from "../store";
ReactDOM.hydrate(
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Fragment>
        <Header />
        <div className="container" style={{ marginTop: 70 }}>
            {routes.map((route,index)=>(
                <Route {...route} key={index}/>
            ))}
        </div>
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
