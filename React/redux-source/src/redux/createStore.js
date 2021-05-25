// 创建仓库，保护state  reducer 是保安 是处理器 由外部传入
function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    return state;
  }
  // 想要修改状态，只能通过派发动作的方式  通过传入reducer 将动作写活 传入dispatch中调用 返回新的状态，进而修改仓库中的状态
  function dispatch(action) {
    let oldState = state;
    state = reducer(state, action);
    listeners.forEach((l) => l(oldState, state));
  }
  // 默认初始执行一下 更新一下状态的初始值
  dispatch({ type: "@@TYPE/REDUX_INIT" });
  // 发布订阅 用来自动渲染  不是必要的
  function subscribe(fn) {
    listeners.push(fn);
    // 取消订阅  返回一个函数让用户自己取消订阅
    return function () {
      listeners = listeners.filter((item) => item !== fn);
    };
  }
  return { getState, dispatch, subscribe };
}
export default createStore;
