// import { createStore, combineReducers, applyMiddleware } from "redux";
import { createStore, combineReducers, applyMiddleware } from "../redux/index";

// import thunk from "redux-thunk";
import thunk from "../redux/middleweare/redux-thunk";
import logger from "../redux/middleweare/redux-logger";

const reducers = {
  todo: function todoReducer(
    state = {
      amount: 0,
      forPerson: "",
      secretSauce: "",
      fromPerson: "",
      toPerson: "",
      error: "",
    },
    action
  ) {
    switch (action.type) {
      case "WITHDRAW":
        return { ...state, amount: action.amount };
      case "MAKE_SANDWICH":
        return {
          ...state,
          ...action.forPerson,
        };
      default:
        return state;
    }
  },
};

const reducer = combineReducers(reducers);
// applyMiddleware 为 createStore 注入了 middleware:
const store = createStore(reducer, applyMiddleware(thunk, logger));

function fetchSecretSauce() {
  return fetch("https://v1.hitokoto.cn/");
}

function withdrawMoney(amount) {
  return function (dispatch, getState) {
    dispatch({
      type: "WITHDRAW",
      amount,
    });
  };
}

function makeASandwich(forPerson) {
  return {
    type: "MAKE_SANDWICH",
    forPerson,
  };
}

// 即使不使用 middleware，你也可以 dispatch action：
store.dispatch(withdrawMoney(100));

function makeASandwichWithSecretSauce() {
  // 控制反转！
  // 返回一个接收 `dispatch` 的函数。
  // Thunk middleware 知道如何把异步的 thunk action 转为普通 action。
  return function (dispatch) {
    return fetchSecretSauce()
      .then((response) => response.json())
      .then((sauce) => {
        dispatch(makeASandwich(sauce));
        return sauce;
      });
  };
}

// 它甚至负责回传 thunk 被 dispatch 后返回的值，
// 所以可以继续串连 Promise，调用它的 .then() 方法。
store.dispatch(makeASandwichWithSecretSauce()).then((data) => {
  console.log("Done!", data);
});

store.subscribe(() => console.log(store.getState()));
