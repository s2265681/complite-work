# 链接

- [toolkit 文档](https://redux-toolkit.js.org/)
- [github](https://github1s.com/reduxjs/redux-toolkit)
- [npm](https://www.npmjs.com/package/@reduxjs/toolkit)
- [Redux 中文文档](https://cn.redux.js.org/redux-toolkit/overview/)
- [Redux Api 文档](https://redux.js.org/api)
- [redux-actions](https://redux-actions.js.org/)

# 概念

- Redux Toolkit 是 Redux 官方推荐，高效的 Redux 开发工具集，简化 Redux 开发，

# 安装

> npm i @react-toolkit

# 实现 createSotore

- 通过 createStore 创建一个 store， 传入 一个 reduce， reducer 接收两个参数。 (state=initState, action)， 通过 dispatch 派发 action ，内部通过调用 reduce 更改全局的 state， state 的变更需要是 创建新对象式的， Immutable 的类型，reducer 是一个纯函数， 传入一个对象，返回一个全新对象。
- 通过 subscribe 传入监听事件，返回取消订阅函数， dispatch 时进行触发执行传入的监听事件
- 通过 getState 方法获取全局 state

```js
export function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(`Expected the root reducer to be a function. Instead`);
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
    currentListeners.map((el) => el());
    return action;
  }
  // 默认随便发送一次 dispatch， 初始化一下state
  dispatch("@____dddd");

  return {
    subscribe,
    dispatch,
    getState,
  };
}
```

# 实现 combineReducers

> 可以考虑将 reducer 函数 拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分

- 传入 reducers 对象， 解析 key 和 value（reducer），
- 遍历执行 每个 key 下面的 reducer，传入 state 和 action， 将返回的 state 进行合并，组合成新的 state 返回

# 实现 applyMiddleware

> Middleware 是扩展 dispatch 的方法， 如 redux-thunk 支持 dispatch function， react-promise 支持 dispatch 一个异步的 Promise action

> 函数签名 ({ getState, dispatch }) => next => action

> middleware 是一个 洋葱模型的 函数执行， 函数嵌套， 传入另一个函数执行， next 执行为下一个执行， 然后嵌套 执行

# Redux-Action

> 生成一个符合 FSA(Flux Standard Action 通用标准动作) 格式的 函数工具库， 大大简化 action 和 reducer 的写法

- [redux-action](https://github.com/redux-utilities/redux-actions)
- [redux-action-doc](https://redux-actions.js.org/)

# Redux-thunk 、 Redux-Promise

# 实现 bindActionCreators

> bindActionCreators 是操作 dispatch 中的 action 的方法， 把传入的函数或者对象， 与 dispatch 进行绑定 ()=> dispatch(actionCreator.apply(this, arguments));

> 将 action 对象与 dispatch 进行绑定， 使用时候避免忘记 dispatch，也不用在传递 dispatch

- 传入的 actionCreators 是函数，返回一个绑定 dispatch 的函数
- 传入的 actionCreators 是对象，返回一个对象， key 为对象的 key，value 是与 dispatch 绑定的函数

```js
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

// 传入的 actionCreators 是函数，返回一个绑定dispatch 的函数
// 传入的 actionCreators 是对象，返回一个对象， key为对象的key，value 是与dispatch 绑定的函数
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error(
      'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
    );
  }
  var boundActionCreators = {};
  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
```
