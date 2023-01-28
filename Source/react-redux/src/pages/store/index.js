import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  createSagaMiddleware,
} from "../../use";
import { counterReducer, todos } from "./reducer";
import { devToolsEnhancer } from "redux-devtools-extension/logOnlyInProduction";
import mySaga, { userReducer } from "./reduxSaga";
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const enhancer = devToolsEnhancer();
// const rootReducers = counterReducer;
const rootReducers = combineReducers({
  counterReducer,
  todos,
  userReducer,
});

let store = createStore(
  rootReducers,
  compose(applyMiddleware(sagaMiddleware), enhancer)
);
sagaMiddleware.run(mySaga);

export default store;
