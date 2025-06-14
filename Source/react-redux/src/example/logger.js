// import { applyMiddleware } from "redux";
import { createStore, applyMiddleware } from "../package/redux/index";

function todoReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

function logger({ getState }) {
  return (next) => (action) => {
    console.log("will dispatch", action);
    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action);
    console.log("state after dispatch", getState());
    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue;
  };
}

function logger2({ getState }) {
  return (next) => (action) => {
    console.log("will dispatch2", action);
    const returnValue = next(action);
    console.log("state after dispatch2", getState());
    return returnValue;
  };
}

const enhancer = applyMiddleware(logger, logger2);

// 应用单个中间件的增强dispatch的方法
function handleEnhancer(middleware) {
  return (createStore) => {
    return function (reducer, preloadedState) {
      const store = createStore(reducer, preloadedState);
      const addMiddlewareDispatch = middleware(store);
      let dispatch = (action) => {
        addMiddlewareDispatch(store.dispatch)(action);
      };
      return {
        ...store,
        dispatch,
      };
    };
  };
}

// console.log(handleEnhancer(logger2), "logger2...");
let store = createStore(todoReducer, ["Use Redux"], handleEnhancer(logger2));
// let store = createStore(todoReducer, ["Use Redux"], enhancer);

store.dispatch({
  type: "ADD_TODO",
  text: "Understand the middleware",
});

console.log(store.getState());
