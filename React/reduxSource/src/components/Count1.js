import React from "react";
import actions from "../store/actions/counter1";
import { connect } from '../react-redux'
import PureComponent from '../react/PureComponent'

class Count1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
    };
  }
  render() {
    console.log('render1');
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

let mapStateFromProps = (state) => state.counter1;
export default connect(mapStateFromProps,actions)(Count1)