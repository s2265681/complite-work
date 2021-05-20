## Redux

> 为什么使用 redux => 单向数据流、缺少共享数据，需要状态提升，为了解决组件的数据共享问题
> 状态、读取改变、订阅

### 1、 手写 redux

#### 1-1、步骤

- 1. 创建 createStore 库，内部维护 state(通过闭包保护)
- 2. 通过 getState 读取 state
- 3. 通过 dispatch 创建唯一合法修改 state 的途径，接受一个动作 action，调用 reducer 返回新的 state，修改 state
- 4. dispatch 过来的动作交给 reducer 去处理， reducer 接受一个老得 state，action，返回一个新的 state
- 5. subscribe： 订阅通过，发布订阅模式，处理每次 dispatch 后的渲染， 每次订阅后返回一个取消订阅的方法

#### 1-2、 redux/createStore.js

```js
// 创建仓库，保护state  reducer 是保安 是处理器 由外部传入
function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    console.log(state, "??");
    return state;
  }
  // 想要修改状态，只能通过派发动作的方式  通过传入reducer 将动作写活 传入dispatch中调用 返回新的状态，进而修改仓库中的状态
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
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
```

#### 1-3、 在 html 中使用

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="title"></div>
    <div id="content"></div>
  </body>
</html>
```

index.js

```js
import { createStore } from "./redux/index.js";

// 渲染  使用
function renderApp(state) {
  let title = document.querySelector("#title");
  let content = document.querySelector("#content");
  title.innerHTML = state.title.text;
  title.style.color = state.title.color;
  content.innerHTML = state.content.text;
  content.style.color = state.content.color;
}

// 常量 用的地方多 避免出错
const CHCNGETITLECOLOR = "CHCNGETITLECOLOR";
const CHCNGECONTENTCOLOR = "CHCNGECONTENTCOLOR";

let initState = {
  title: {
    color: "red",
    text: "标题",
  },
  content: {
    color: "green",
    text: "内容",
  },
};

// 管理员 接收老状态、动作 返回一个新状态  reducer 中的处理 每次都返回新对象 性能优化考虑
function reducer(state = initState, action) {
  switch (action.type) {
    case "CHCNGETITLECOLOR":
      //   state.title.color = action.color;
      return { ...state, title: { ...state.title, color: action.color } };
    case "CHCNGECONTENTCOLOR":
      return { ...state, content: { ...state.content, color: action.color } };
    default:
      return state;
  }
}

let store = createStore(reducer);

function render() {
  renderApp(store.getState());
}
render();
let unsubscribe = store.subscribe(render);
console.log(unsubscribe, "unsubscribe");
setTimeout(() => {
  // 派发动作 修改状态
  store.dispatch({ type: CHCNGETITLECOLOR, color: "yellow" });
  unsubscribe();
  store.dispatch({ type: CHCNGECONTENTCOLOR, color: "orange" });
}, 1000);
```

#### 1-4、 在 react 中使用

index.js

```js
import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "./redux/index.js";

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, number: state.number + 1 };
    case "MINUS":
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}
const store = createStore(reducer);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: store.getState().number,
    };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().number })
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={() => store.dispatch({ type: "ADD" })}>+</button> <br />
        <button onClick={() => store.dispatch({ type: "MINUS" })}>-</button>
      </div>
    );
  }
}

class Hello extends React.Component {
  render() {
    return <div>hello</div>;
  }
}

ReactDOM.render(
  <>
    <App></App>
    <Hello></Hello>
  </>,
  document.getElementById("root")
);
```

#### 1-5、 bindActionCreators.js

> 原理： 抽象函数简化 store 中状态的绑定, 将 store.dispatch({...}) 抽到函数中去完成

```js
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return (...args) => dispatch(actionCreators(...args));
  }
  let bondActionCreators = {};
  for (const key in actionCreators) {
    bondActionCreators[key] = (...args) =>
      dispatch(actionCreators[key](...args));
  }
  return bondActionCreators;
}
```

index.js

```js
import React from "react";
import ReactDOM from "react-dom";

import { createStore, bindActionCreators } from "./redux/index.js";

// 1、传入函数
// let add = () => ({ type: "ADD" })
// let minus = () => ({ type: "MINUS" })
// add = combineReducers(store.dispatch, add)
// minus =  combineReducers(store.dispatch, minus)

// 2、 传入对象
let actions = {
  add: (args) => ({ type: "ADD", payload: args }),
  minus: (args) => ({ type: "MINUS", payload: args }),
};

actions = bindActionCreators(actions, store.dispatch);
const store = createStore(reducer);

function reducer(state = { number: 0 }, actions) {
  switch (actions.type) {
    case "ADD":
      return { ...state, number: state.number + actions.payload };
    case "MINUS":
      return { ...state, number: state.number - actions.payload };
    default:
      return state;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: store.getState().number,
    };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().number })
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={() => actions.add(5)}>+</button>
        <br />
        <button onClick={() => actions.minus(5)}>-</button>
      </div>
    );
  }
}
ReactDOM.render(<App></App>, document.getElementById("root"));
```

#### 1-6、 combineReducers.js

> redux 永远只有一个仓库，reducer 也只有一个， 状态树也只能有一个， 但是组件可能有 N 个多，reducer 会非常复杂，需要分工
> 解决 通过 combineReducers 将多个 reducer 合在一起

redux/combineReducers.js
```js
function combineReducers(reducers = {}) {
  let reducerKeys = Object.keys(reducers); // [counter1,counter2]
  return function (state = {}, action) {
    let hasChange = false; // 状态是否修改
    let nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i]; // counter1
      const previousStateForKey = state[key]; // {number:0}
      const reducer = reducers[key]; // counter1
      let nextStateForKey = reducer(previousStateForKey, action); // {type:'ADD1'} {number:0}
      nextState[key] = nextStateForKey;
      hasChange = hasChange || nextStateForKey !== previousStateForKey;
    }
    return hasChange ? nextState : state;
  };
}

export default combineReducers;
```


reducers/index.js
```js
import counter1 from './counter1'
import counter2 from './counter2'
import { combineReducers } from '../../redux/index'
/**
 * {
 *   counter1: { number1:0},
 *   counter1: { number2:0}
 * }
 */
// export default function(state={},action){
//   let nextState = {};
//   nextState.counter1 = counter1(state.counter1,action)
//   nextState.counter2 = counter2(state.counter2,action)
//   console.log(nextState,'nextState...object');
//   return nextState;
// }

let reducers = combineReducers({
    counter1,
    counter2
})

export default reducers
```
'