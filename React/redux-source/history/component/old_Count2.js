import React from "react";
import { bindActionCreators } from "../redux/index"

import actions from '../store/actions/counter2'
import store from '../store/index'

let bindActions  = bindActionCreators(actions, store.dispatch);
 
class Count2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: store.getState().counter2.number,
    };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().counter2.number })
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={() => bindActions.add(5)}>+</button>
        <br />
        <button onClick={() => bindActions.minus(5)}>-</button>
      </div>
    );
  }
}

export default Count2