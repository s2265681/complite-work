
### unstated-next

### 安装 
> 安装 npm install --save unstated-next

### API 使用
> createContainer(useHook)
> <Container.Provider>
> <Container.Provider initialState>
> Container.useContainer()
> useContainer(Container)

Example: 
```js
import React, { useState, createContext, useContext, useCallback } from "react";
import { createContainer } from "unstated-next";
// import { createContainer } from "./unstated-next";
// 通过自定义hook 共享逻辑
function useConter(initialState = 0) {
  let [count, setCount] = useState(initialState);
  let decrement = useCallback(() => setCount(count - 1), [count]);
  let increment = useCallback(() => setCount(count + 1), [count]);
  return {
    count,
    decrement,
    increment,
  };
}

// 通过Context共享状态
let Counter = createContainer(useConter);
console.log(Counter, "Counter....111");
// let Counter = createContext(null);

function InnerCounter() {
  let counter = Counter.useContainer();
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <p>You clicked {counter.count} times</p>
      <button onClick={counter.increment}>+</button>
    </div>
  );
}

function CounterHandle() {
  let counter = Counter.useContainer(Counter);
  return (
    <div>
      <CounterDisplay {...counter}></CounterDisplay>
    </div>
  );
}

let CounterDisplay = React.memo((props) => {
  return (
    <div>
      <button onClick={props.decrement}>-</button>
      <p>You clicked {props.count} times</p>
      <button onClick={props.increment}>+</button>
    </div>
  );
});

function App() {
  return (
    <Counter.Provider initialState={2}>
      <CounterHandle />
      <Counter.Provider initialState={1}>
        <InnerCounter />
      </Counter.Provider>
    </Counter.Provider>
  );
}
export default App;

```


### 原理

- 通过React.createContext() API 提供Provider， 通过React.useContext获取最新状态， 在Provider方法上调用用户自定义的useHook， 拿到最新的状态和方法注入， 通过useContainer获取最新的值

- 解决： 如何拿到Provider 上设置的 initialState，  通过重写Context对象上的Provider方法通过props传入拿到


> 简版源码
```js
import React, { createContext, useContext } from "react";
export function createContainer(useHook) {
  let Context = createContext(null);
  const Provider = function Provider(props) {
    let value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  };
  const useContainer = function () {
    let value = useContext(Context);
    return value;
  };
  return {
    Provider,
    useContainer,
  };
}
```


### 参考

[参考地址](https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx)