import ComponentA from "./component/A";
import ComponentB from "./component/B";
import { incremented, decremented } from "./store/action";
import { bindActionCreators } from "redux";
import PageHitokoto from "./PageHitokoto";
import { connect } from "../use";

const PageUsereactRedux = (props) => {
  console.log("render PageUsereactRedux", props);
  return (
    <div>
      我是页面 <br />
      <div>
        组件 <br />
        <ComponentA value={props.value} />
        <button
          onClick={() => {
            props.incremented();
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            props.decremented();
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
      </div>
      <div className="user">
        <PageHitokoto />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return state.counterReducer;
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ incremented, decremented, dispatch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageUsereactRedux);
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
