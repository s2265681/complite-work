import React from "react";
import actions from "../store/actions/counter1";
import { connect } from 'react-redux'
class Count2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
    };
  }
  render() {
    return (
      <div>
        <div>{this.props.number}</div>
        <button onClick={()=>this.props.add(5)}>+</button>
        <br />
        <button onClick={()=>this.props.minus(5)}>-</button>
      </div>
    );
  }
}

let mapStateFromProps = (state) => state.counter2;
export default connect(mapStateFromProps, actions)(Count2);
