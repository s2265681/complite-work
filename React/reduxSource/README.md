## Redux

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




#### 1-5、 combineReducers.js 
> 原理： 抽象函数简化store中状态的绑定, 将store.dispatch({...}) 抽到函数中去完成

```js

```