import { createStore, combineReducers } from "redux";
import { counterReducer, todos } from "./reducer";

const rootReducers = combineReducers({
  counterReducer,
  todos,
});

let store = createStore(rootReducers);

export default store;
