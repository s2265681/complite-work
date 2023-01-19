import { createStore, combineReducers } from "redux";
import { handleActions } from "redux-actions";

function configureStore(reducerObj) {
  const reducer2 = handleActions(
    reducerObj.reducer.counter.reducers,
    reducerObj.reducer.counter.initialState
  );

  const store = createStore(reducer2);
  return store;
}

export default configureStore;
