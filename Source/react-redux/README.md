# 链接

- [toolkit 文档](https://redux-toolkit.js.org/)
- [github](https://github1s.com/reduxjs/redux-toolkit)
- [npm](https://www.npmjs.com/package/@reduxjs/toolkit)
- [Redux 中文文档](https://cn.redux.js.org/redux-toolkit/overview/)
- [Redux Api 文档](https://redux.js.org/api)
- [redux-actions](https://redux-actions.js.org/)

- [redux、react-redux、redux-sage 原理文章](https://juejin.cn/post/6844904126426398734)

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

# 实现 react-redux

- [文档](https://www.redux.org.cn/docs/react-redux/)

> API 有两个 通过 Provider 把 store 的方法注入 组件的 props 上， 通过内部维护状态的更新， 更新组件状态，
> 通过 connect 这个 高阶函数， 传入参数控制， 注入 state 的取值， 和 action 的注入， 完成组件内部，便捷的使用状态和操作方便的操作 dispatch
> [connect 源码分析](https://github.com/baozouai/redux-source-analysis/blob/main/src/packages/react-redux/src/components/connect.tsx)

实现 mapStateToProps, mapDispatchToProps

> 传入两个函数， 一个用来选取当前的状态， 一个用来将 dispatch 的 action 放入 props 中

> 优化 react-redux

- 只更新当前组件的 selector-state 的变化， 对子 组件的 props 进行处理， 默认不更新， 如果子组件的 props 与当前的状态发生了变化，那么更新子组件， 通过 useMemo 进行处理

# 配置 redux-devtools-extension

```js
import { createEnhancer } from "redux-devtools-extension";
const enhancer = createEnhancer();
const store = createStore(rootReducer, enhancer);
```

> 原理 通过 enhancer 的传入， 在内部创建 store， 改写 reducer 每次 dispatch 都通过插件拦截
> return enhancer(createStore)(reducer, preloadedState);

# redux-saga

[文档](https://redux-saga-in-chinese.js.org/index.html)

> redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。redux-saga 是一个 redux 中间件，意味着这个线程可以通过正常的 redux action 从主应用程序启动，暂停和取消，它能访问完整的 redux state，也可以 dispatch redux action。异步， 使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试

```js
 npm install --save redux-saga
```

[原理参考](https://blog.csdn.net/luo_qianyu/article/details/112794443)

# redux-persist
