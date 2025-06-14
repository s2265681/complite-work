export function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(`Expected the root reducer to be a function. Instead`);
  }

  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== "undefined") {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    currentListeners.push(listener);
    return function unsubscribe() {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
    // 执行订阅
    currentListeners.map((el) => el(getState()));
    return action;
  }
  // 默认随便发送一次 dispatch， 初始化一下state
  dispatch({ type: "@@redux/INITc.q.d.f.1.j" });

  return {
    subscribe,
    dispatch,
    getState,
  };
}
