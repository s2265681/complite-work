import React, {PureComponent} from "react";
import { connect } from "react-redux";
// import { MINU1 } from "../action-types";

 class Count extends PureComponent {
  constructor(props,context) {
    super(props);
    this.state = {
      number: props.number,
    };
  }
  render() {
    console.log("render1");
    return (
      <div>
        <div>{this.props.number}</div>
        <button onClick={() => this.props.addAsync(5)}>+</button>
        <br />
        <button onClick={() => this.props.minus(5)}>-</button>
      </div>
    );
  }
}
//* 使用更简单， 减少无用渲染
let mapStateToProps = (state) => state.counter;
//* 传入actions对象也可以函数也可以做兼容
let mapDispatchToProps = (dispatch) => ({
  add() {
    dispatch({ type: "ADD", payload: 1 });
  },
  addAsync() {
    dispatch({ type: "ADD_ASYNC", payload: 1 });
  },
  minus() {
    dispatch({ type: "MINU", payload: 1 });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Count)