import ReactReduxContext from "./ProviderContext";
import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ReactReduxContext.Provider value={{store:this.props.store}}>
          {this.props.children}
      </ReactReduxContext.Provider>
    );
  }
}
