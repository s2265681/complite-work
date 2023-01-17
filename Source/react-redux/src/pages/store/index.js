import { createStore, combineReducers } from "../../package/redux";
// import { createStore, combineReducers } from "redux";
// import { createStore } from "../../package/redux";

import { counterReducer, todos } from "./reducer";
import { devToolsEnhancer } from "redux-devtools-extension/logOnlyInProduction";

const enhancer = devToolsEnhancer();
// const rootReducers = counterReducer;
const rootReducers = combineReducers({
  counterReducer,
  todos,
});

let store = createStore(rootReducers, enhancer);

export default store;
