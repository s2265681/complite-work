import "./App.css";
// import { useEffect, useState } from "react";
// import { useState } from "./hooks/index";
import ReactDOM from "react-dom/client";

let cursor = 0;
let memoizedState = [];

const useState = (initValue) => {
  memoizedState[cursor] = memoizedState[cursor] || initValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    console.log(memoizedState, "memoizedState");
    render();
  }
  return [memoizedState[cursor++], setState];
};

// let _deps; // _deps 记录useEffect 上一次的依赖
const useEffect = (callback, depsArray) => {
  const hasNoDeps = !depsArray;
  // 如果没有依赖，每次都执行
  // 如果有依赖，只有依赖变化时才执行 通过 === 全等判断是否依赖发生了改变
  const _deps = memoizedState[cursor];
  const hasChangedDeps = _deps
    ? !depsArray.every((el, i) => el === _deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depsArray;
  }
  cursor++;
};

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log("count");
  }, [count]);

  const [count3, setCount3] = useState(0);

  console.log(cursor, "cursor");
  console.log(memoizedState, "memoizedState");

  useEffect(() => {
    console.log("count3");
  }, [count3]);

  return (
    <div className="App">
      <header className="App-header">
        <p
          onClick={() => {
            setCount(count + 1);
          }}
        >
          COUNT: {count}
        </p>
        <p
          onClick={() => {
            setCount2(count2 + 1);
          }}
        >
          COUNT2: {count2}
        </p>
        <p
          onClick={() => {
            setCount3(count3 + 1);
          }}
        >
          COUNT3: {count3}
        </p>
      </header>
    </div>
  );
}

let root = ReactDOM.createRoot(document.getElementById("root"));
function render() {
  cursor = 0;
  root.render(<App />);
}
render();
// export default App;
