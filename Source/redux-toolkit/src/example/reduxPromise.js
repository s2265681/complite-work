// import promiseMiddleware from "redux-promise";
import promiseMiddleware from "../redux/middleweare/redux-promise";
import logger from "../redux/middleweare/redux-logger";
import { createStore, combineReducers, applyMiddleware } from "../redux/index";

const reducers = {
  data: function todoReducer(
    state = {
      foo: "",
    },
    action
  ) {
    switch (action.type) {
      case "ACTION_TYPE":
        return { ...state, foo: action.payload };
      default:
        return state;
    }
  },
};

const reducer = combineReducers(reducers);

const store = createStore(reducer, applyMiddleware(promiseMiddleware, logger));
store.subscribe(() => console.log(store.getState(), "state"));

// isFSA payload promise
store.dispatch({
  type: "ACTION_TYPE",
  payload: fetch("https://v1.hitokoto.cn/").then((response) => response.json()),
});

// not isFSA promise
store.dispatch(
  fetch("https://v1.hitokoto.cn/").then((response) => response.json())
);

// isFSA payload not promise
store.dispatch({
  type: "ACTION_TYPE",
  payload: "haha",
});
