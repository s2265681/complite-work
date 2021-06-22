import React, { Component, Fragment } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import Header from "../components/Header";
class App extends Component {
  render() {
    //   console.log(this.props)
    return (
      <Fragment>
        <Header />
        <div className="container" style={{ marginTop: 70 }}>
          {renderRoutes(this.props.route.routes)}
        </div>
      </Fragment>
    );
  }
}

export default App;
