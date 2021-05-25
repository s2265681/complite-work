import React from "react";
// import { bindActionCreators } from "../redux/index";
import actions from "../store/actions/counter1";
import { connect } from 'react-redux'
// import store from "../store/index";
// let bindActions = bindActionCreators(actions, store.dispatch);
class Count1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //   number: store.getState().counter1.number,
      number: props.number,
    };
  }
  //   componentDidMount() {
  //     this.unsubscribe = store.subscribe(() =>
  //       this.setState({ number: store.getState().counter1.number })
  //     );
  //   }
  //   componentWillUnmount() {
  //     this.unsubscribe();
  //   }
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

let mapStateFromProps = (state) => state.counter1;
export default connect(mapStateFromProps, actions)(Count1);
