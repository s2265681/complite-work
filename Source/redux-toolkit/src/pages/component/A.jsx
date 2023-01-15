import { connect } from "../../react-redux";
// import { connect } from "react-redux";

const ComponentA = (props) => {
  console.log(props, "A props");

  return (
    <div>
      我是A组件
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
        {props.todos.key.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default connect(mapStateToProps)(ComponentA);
