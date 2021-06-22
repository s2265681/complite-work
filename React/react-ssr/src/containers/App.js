import React, { Component, Fragment } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import Header from "../components/Header";
import { connect } from "react-redux";
import actions from "../store/actions/session";
import styles from "./App.css";
import withStyles from '../withStyles';

class App extends Component {
//   componentWillMount() {
//     if (this.props.staticContext) {
//       this.props.staticContext.csses.push(styles._getCss());
//     }
//   }
  render() {
    //   console.log(this.props)
    return (
      <Fragment>
        <Header staticContext={this.props.staticContext} />
        <div className="container" className={styles.app}>
          {renderRoutes(this.props.route.routes)}
        </div>
      </Fragment>
    );
  }
}
App.loadData = function (store) {
  return store.dispatch(actions.getUser());
};

export default withStyles(App,styles);
