### react-saga

- redux-saga 是 redux 一个中间件，为 redux 提供额外功能
- reducers 中所有操作都是同步并且纯粹
- 实际开发中，需要一些异步的且可能不纯粹的操作(改变外部状态) 函数编程范式中称为副作用
- react-sage 的优点: 1、流程清晰 2、处理异步，可暂停 3、单元测试简单 4、提供多种 effect 方法 缺点： 写法比 think 复杂

### react-saga 的工作原理

- sage 采用 Generator 函数来 yield Effects(包含指令的文本对象)
- Generator 的作用是可以暂停执行，再次执行的时候从上次暂停的地方执行
- Effect 是一个简单的对象，包含来一些给 middleware 解释执行的信息
- 可以通过使用 effects API 如 fork、call、take、put、cancel 等创建 Effect

### redux-sage 分类

- work-sage 实际工作，调用 API、进行异步请求、获取异步封装结果
- watcher saga 监听被 dispatch 的 actions，当接受到 action 或者知道其他被触发是，调用 worker 执行任务
- root saga 立即启动 saga 的唯一入口

### 使用

index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Count from "./components/Count";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <Count />
  </Provider>,
  document.getElementById("root")
);
```

store/index.js

```js
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/index";
// const store = createStore(reducer);
import createSagaMiddleware from "redux-saga";
import { helloSaga } from "./saga";
const sagaMiddleware = createSagaMiddleware();
const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(helloSaga);
export default store;
```

### Effects

- fock: 相当于开启了一个子进程，会单独执行而不会影响当前的主进程，主进程会立刻向下执行，不会阻碍当前
- take: 监听 action 一次，需要配合 while
- takeEvey: 监听多次
- select: 拿到最新的 state 可以通过传入函数过滤当前
- call: 调用函数 call([API.login,...arg])
- cancelled: 取消调用 可以在 finnally 种检测到 yeild cancelled
- race: 可以取消监听

### 手写

#### take

```js
function createChannel() {
  let observer = {};
  function subscribe(actionType, listener) {
    observer[actionType] = listener;
  }
  function publish(actionType) {
    if (observer[actionType]) {
      observer[actionType]();
      delete observer[actionType];
    }
  }
  return { subscribe, publish };
}
let { subscribe, publish } = createChannel();

subscribe("ASYNC_INCREMENT", () => {
  console.log("ASYNC_INCREMENT");
});
publish("ASYNC_INCREMENT");
// publish("ASYNC_INCREMENT");
```
