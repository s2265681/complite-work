import { connect } from "../../use";

const ComponentA = (props) => {
  console.log("render ComponentA", props);
  return (
    <div>
      <h1>ComponentA 组件</h1>
      <button
        onClick={() => {
          props.dispatch({
            type: "ADD_TODO",
            payload: [222],
          });
        }}
      >
        更改A todos{" "}
      </button>
      <h2>这是父组件 传入的 props value: {props.value}</h2>
      <h3>测试 store 中拿的数据更新 {props.counterReducer.value}</h3>
      <ul>
        {props.todos.key.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default connect(mapStateToProps)(ComponentA);
