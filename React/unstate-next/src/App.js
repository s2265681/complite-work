import React, { useState, createContext, useContext, useCallback } from "react";
import { createContainer } from "./unstated-next";

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
