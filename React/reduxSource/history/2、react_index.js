import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "./redux/index.js";

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, number: state.number + 1 };
    case "MINUS":
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}
const store = createStore(reducer);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: store.getState().number,
    };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().number })
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={() => store.dispatch({ type: "ADD" })}>+</button>{" "}
        <br />
        <button onClick={() => store.dispatch({ type: "MINUS" })}>-</button>
      </div>
    );
  }
}

class Hello extends React.Component {
  render() {
    return <div>hello</div>;
  }
}

ReactDOM.render(
  <>
    <App></App>
    <Hello></Hello>
  </>,
  document.getElementById("root")
);
