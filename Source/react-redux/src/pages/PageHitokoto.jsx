import { connect } from "../use";

function Hitokoto(props) {
  console.log("render Hitokoto", props);
  const fetchRequest = () => {
    debugger;
    props.dispatch({
      type: "USER_FETCH_REQUESTED",
      payload: { userId: "111" },
    });
  };
  return (
    <div>
      <h1>Hitokoto 组件</h1>
      <h2>用户信息：</h2>
      <h3>hitokoto: {props?.user?.hitokoto}</h3>
      <button onClick={fetchRequest}>点击获取 Hitokoto 信息</button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return state.userReducer;
};

export default connect(mapStateToProps)(Hitokoto);
