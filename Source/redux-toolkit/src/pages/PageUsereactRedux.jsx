import ComponentA from "./component/A";
import ComponentB from "./component/B";
// import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { incremented, decremented } from "./store/action";
import { connect } from "../react-redux";

const PageUsereactRedux = (props) => {
  console.log(props, "props11");
  return (
    <div>
      我是页面 <br />
      <div>
        组件 <br />
        <ComponentA />
        <button
          onClick={() => {
            // props.dispatch({
            //   type: "counter/incremented",
            // });
            props.incremented();
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            // props.dispatch({
            //   type: "counter/decremented",
            // });
            // props.decremented();
          }}
        >
          -1
        </button>
      </div>
      <div>
        组件 B<br />
        <ComponentB />
        count:
        {props.value}
        {/* {props.counterReducer.value} */}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  return state.counterReducer;
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ incremented, decremented }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageUsereactRedux);

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
