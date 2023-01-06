// 最终组合的函数为下面格式
// function combineReducer(state = {}, action) {
//     let nextState = {};
//     nextState["counterReducer"] = counterReducer(state["counterReducer"], action);
//     nextState["todos"] = todos(state["todos"], action);
//     return nextState;
//   }
export default function combineReducers(reducers) {
  // 拿出 reducers 中的keys
  const finalReducerKeys = Object.keys(reducers);
  return function combination(state = {}, action) {
    const nextState = {};
    // 遍历keys
    for (let i = 0; i < finalReducerKeys.length; i++) {
      // reducer 的 key
      const key = finalReducerKeys[i];
      // reducer的 value
      const reducer = reducers[key];
      // 上次的状态， 初始为 undefined， 返回写的默认值
      const previousStateForKey = state[key];
      // 依次执行 reducer 获取最新的 state
      const nextStateForKey = reducer(previousStateForKey, action);
      // 返回的state 放到对象中 合并 返回
      //   { conter:xx, todos:xx }
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}
