import {
  createAction,
  createActions,
  handleActions,
  combineActions,
  handleAction,
} from "redux-actions";

import { createStore } from "redux";

// example
// console.log(createAction("INCREMENT")(0));
// console.log(createAction("ADD_TODO")("Use Redux"));

// type reducer defaultState
// const reducer = handleAction(
//   "INCREMENT",
//   (state, action) => ({
//     counter: state.counter + action.payload,
//   }),
//   defaultState
// );
const defaultState = { counter: 10 };
const reducer2 = handleActions(
  {
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload,
    }),

    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload,
    }),
  },
  defaultState
);
const store = createStore(reducer2);
store.subscribe(() => console.log(store.getState(), "state"));
store.dispatch(createAction("INCREMENT")(4));
// store.dispatch({
//   type: "INCREMENT",
//   payload: 12,
// });
store.dispatch(createAction("DECREMENT")(3));
store.dispatch(createAction("INCREMENT")(1));
