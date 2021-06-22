import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions/counter";
class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-6">
          <p>{this.props.number}</p>
          <button onClick={this.props.increment}>+</button>
        </div>
      </div>
    );
  }
}

Home = connect((state) => state.counter, actions)(Home);
export default Home;
