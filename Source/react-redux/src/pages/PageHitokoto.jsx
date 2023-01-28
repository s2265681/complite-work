import { connect } from "../use";
import { useEffect } from "react";

function Hitokoto(props) {
  console.log("render Hitokoto", props);

  useEffect(() => {
    props.dispatch({
      type: "USER_FETCH_REQUESTED",
      payload: { userId: "111" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Hitokoto 组件</h1>
      <h2>用户信息：</h2>
      <h3>hitokoto: {props?.user?.hitokoto}</h3>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return state.userReducer;
};

export default connect(mapStateToProps)(Hitokoto);
