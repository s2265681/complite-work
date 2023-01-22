import { createAction } from "redux-actions";
import createReducer from "./createReducer";
function createSlice(options) {
  const { name } = options;
  const initialState = options.initialState;
  const reducers = options.reducers || {};
  const reducerNames = Object.keys(reducers);

  const actionCreators = {};
  const sliceCaseReducersByName = {};
  const sliceCaseReducersByType = {};

  reducerNames.forEach((reducerName) => {
    const type = `${name}/${reducerName}`;
    // maybe with prepare esplipe
    const caseReducer = reducers[reducerName];
    actionCreators[reducerName] = createAction(type);
    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
  });

  function buildReducer() {
    const [
      extraReducers = {},
      actionMatchers = [],
      defaultCaseReducer = undefined,
    ] = [options.extraReducers];

    const finalCaseReducers = { ...extraReducers, ...sliceCaseReducersByType };
    return createReducer(initialState, (builder) => {
      for (let key in finalCaseReducers) {
        builder.addCase(key, finalCaseReducers[key]);
      }
      for (let m of actionMatchers) {
        builder.addMatcher(m.matcher, m.reducer);
      }
      if (defaultCaseReducer) {
        builder.addDefaultCase(defaultCaseReducer);
      }
    });
  }

  let _reducer;
  return {
    name,
    reducer(state, action) {
      if (!_reducer) _reducer = buildReducer();
      console.log(_reducer, "_reducer...", state, action);
      return _reducer(state, action);
    },
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName,
    getInitialState() {
      if (!_reducer) _reducer = buildReducer();
      return _reducer.getInitialState();
    },
  };
}

export default createSlice;
