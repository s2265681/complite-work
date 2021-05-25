import React from "react";
import ReactDOM from "react-dom";

import { createStore, bindActionCreators } from "./redux/index.js";

// 1、传入函数
// let add = () => ({ type: "ADD" })
// let minus = () => ({ type: "MINUS" })
// add = combineReducers(store.dispatch, add)
// minus =  combineReducers(store.dispatch, minus)

// 2、 传入对象
let actions = {
  add: (args) => ({ type: "ADD", payload: args }),
  minus: (args) => ({ type: "MINUS", payload: args }),
};

actions = bindActionCreators(actions, store.dispatch);
const store = createStore(reducer);

function reducer(state = { number: 0 }, actions) {
  switch (actions.type) {
    case "ADD":
      return { ...state, number: state.number + actions.payload };
    case "MINUS":
      return { ...state, number: state.number - actions.payload };
    default:
      return state;
  }
}

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
        <button onClick={() => actions.add(5)}>+</button>
        <br />
        <button onClick={() => actions.minus(5)}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<App></App>,document.getElementById("root"));
