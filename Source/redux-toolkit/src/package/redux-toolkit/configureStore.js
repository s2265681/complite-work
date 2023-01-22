// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "../redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

function getDefaultMiddleware() {
  let middlewareArray = [];
  middlewareArray.push(thunkMiddleware);
  return middlewareArray;
}

function curryGetDefaultMiddleware() {
  return function curriedGetDefaultMiddleware(options) {
    return getDefaultMiddleware(options);
  };
}

function configureStore(options) {
  const curriedGetDefaultMiddleware = curryGetDefaultMiddleware();

  const {
    reducer = undefined,
    middleware = curriedGetDefaultMiddleware(),
    devTools = true,
    preloadedState = undefined,
    enhancers = undefined,
  } = options || {};

  let rootReducer = null;

  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (typeof reducer === "object") {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    );
  }

  let finalMiddleware = middleware;

  console.log(finalMiddleware, "finalMiddleware..");
  // finalMiddleware 如果是函数.. 省略
  const middlewareEnhancer = applyMiddleware(...finalMiddleware);

  let finalCompose = compose;

  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: !process.env.NODE_ENV === "production",
      ...(typeof devTools === "object" && devTools),
    });
  }

  let storeEnhancers = [middlewareEnhancer];

  if (Array.isArray(enhancers)) {
    storeEnhancers = [middlewareEnhancer, ...enhancers];
  } else if (typeof enhancers === "function") {
    storeEnhancers = enhancers(storeEnhancers);
  }

  const composedEnhancer = finalCompose(...storeEnhancers);

  console.log(rootReducer, preloadedState, "rootReducer");
  let store = createStore(rootReducer, preloadedState, composedEnhancer);

  return store;
}

export default configureStore;
