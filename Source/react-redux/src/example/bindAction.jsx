import { Component, useMemo, useEffect, useState } from "react";
// import { bindActionCreators, createStore } from "redux";
import { connect } from "react-redux";
import { bindActionCreators, createStore } from "../redux/index";

import * as TodoActionCreators from "./actionCreators";

const reducers = function todoReducer(
  state = {
    text: "",
    id: "",
  },
  action
) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, text: action.payload };
    case "REMOVE_TODO":
      return { ...state, id: action.payload };
    default:
      return state;
  }
};

// applyMiddleware 为 createStore 注入了 middleware:
const store = createStore(reducers);
const dispatch = store.dispatch;

function TodoListContainer(props) {
  const [stateObj, setStateObj] = useState({ text: "", id: "" });
  // react-redux 注入:
  // 这是一个很好的 bindActionCreators 用例:
  // 你希望子组件完全不知道 Redux.
  // 我们现在创建这些函数的绑定版本，以便我们可以
  // 之后将它们传给子组件.

  const boundActionCreators = useMemo(
    // 传入是一个对象
    () => bindActionCreators(TodoActionCreators, dispatch),
    [dispatch]
  );
  console.log(boundActionCreators, "boundActionCreators");
  // {
  //   addTodo: Function,
  //   removeTodo: Function
  // }

  useEffect(() => {
    // 注意： 这不起作用:
    // TodoActionCreators.addTodo('Use Redux')
    // 你只是在调用一个创建 action 的函数。
    // 你也必须同时 dispatch 一个 action！
    // 这将起到作用:
    let action = TodoActionCreators.addTodo("Use Redux");
    dispatch(action);
    setStateObj(store.getState());
    setTimeout(() => {
      // 绑定了dispatch的函数，直接执行就可以发送dispatch
      boundActionCreators.removeTodo("33");
      setStateObj(store.getState());
    }, 4000);
  }, []);

  return (
    <div>
      TODO 子组件 传入 boundActionCreators 后面直接调用
      <br />
      {store.getState().text}
      text: {stateObj.text}
      <br />
      id: {stateObj.id || "..."}
    </div>
  );
  //  bindActionCreators 的替代方法
  // 只有向下传递 dispatch 函数, 但是你的子组件
  // 需要 import action creators 并了解它们.
  // return <TodoList todos={todos} dispatch={dispatch} />
}

export default TodoListContainer;
