import { ReactReduxContext } from "./Context";
import { useState, useEffect, useRef, useContext, useMemo } from "react";

function useSelector(selector) {
  // 增加一个发布订阅
  const { store } = useContext(ReactReduxContext);
  const state = store.getState();
  const [_state, _setState] = useState("");
  useEffect(
    function () {
      store.subscribe(() => {
        console.log(store.getState(), "store.getState()....");
        _setState(selector(store.getState()));
      });
    },
    [store]
  );
  console.log(_state, selector(store.getState()), "_state...");
  return selector(store.getState());
}

function useDispatch() {
  const { store } = useContext(ReactReduxContext);
  const { _state, setState } = useState("");
  return (action) => {
    store.dispatch(action);
  };
}

export { useSelector, useDispatch };
