import {
  createStore,
  combineReducers,
  // applyMiddleware,
} from "../../package/redux";
// import { createStore, combineReducers } from "redux";
// import { createStore } from "../../package/redux";
import createSagaMiddleware from "redux-saga";

import { counterReducer, todos } from "./reducer";
import { devToolsEnhancer } from "redux-devtools-extension/logOnlyInProduction";
import mySaga from "../../example/reduxSaga";
import { applyMiddleware, compose } from "redux";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = devToolsEnhancer();
// const rootReducers = counterReducer;
const rootReducers = combineReducers({
  counterReducer,
  todos,
});

let store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
  // compose(applyMiddleware(sagaMiddleware), enhancer)
);
sagaMiddleware.run(mySaga);

export default store;
