import { useEffect, useState } from "react";
import ComponentA from "./component/A";
import ComponentB from "./component/B";
import store from "./store/index";

const NotUseReactRedux = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    store.subscribe(() => {
      const count = store.getState().counterReducer.value;
      setCount(count);
    });
  }, []);
  return (
    <div>
      我是页面 <br />
      <div>
        组件 <br />
        <ComponentA />
        <button
          onClick={() => {
            store.dispatch({
              type: "counter/incremented",
            });
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            store.dispatch({
              type: "counter/decremented",
            });
          }}
        >
          -1
        </button>
      </div>
      <div>
        组件 B<br />
        <ComponentB />
        count: {count}
      </div>
    </div>
  );
};

export default NotUseReactRedux;
