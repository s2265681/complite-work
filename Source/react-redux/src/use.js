/*react-redux*/
// import { connect, Provider } from "react-redux";
import { connect, Provider } from "./package/react-redux";

/*redux*/
// import {
//   createStore,
//   bindActionCreators,
//   combineReducers,
//   applyMiddleware,
//   compose,
// } from "redux";
import {
  createStore,
  // bindActionCreators,
  combineReducers,
  applyMiddleware,
  compose,
} from "./package/redux";

/** redux-saga */
// import createSagaMiddleware from "redux-saga";
// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import createSagaMiddleware from "./package/react-saga";
import { call, put, takeEvery, all } from "./package/react-saga/effects";

export {
  connect,
  Provider,
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  createSagaMiddleware,
  call,
  put,
  all,
  takeEvery,
};
