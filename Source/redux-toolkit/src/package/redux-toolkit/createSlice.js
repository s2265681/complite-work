import { createAction } from "redux-actions";
import createReducer from "./createReducer";
import createNextState, { isDraft, isDraftable } from "immer";

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

  // a simple createReducer
  function simpleReducer() {
    const [extraReducers = {}] = [options.extraReducers];

    let getInitialState = () => createNextState(initialState, () => {});
    let actionsMap = {};
    let finalCaseReducers = { ...extraReducers, ...sliceCaseReducersByType };
    for (let key in finalCaseReducers) {
      actionsMap[key] = finalCaseReducers[key];
    }
    console.log(actionsMap, "actionsMap...");
    return function reducer(state = getInitialState(), action) {
      reducer.getInitialState = getInitialState;
      let caseReducers = [actionsMap[action.type]];
      return caseReducers.reduce((previousState, caseReducer) => {
        if (caseReducer) {
          return createNextState(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
        return previousState;
      }, state);
    };
  }

  let _reducer;
  return {
    name,
    reducer(state, action) {
      // if (!_reducer) _reducer = buildReducer();
      if (!_reducer) _reducer = simpleReducer();
      console.log(_reducer, "_reducer...", state, action);
      return _reducer(state, action);
    },
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName,
    getInitialState() {
      // if (!_reducer) _reducer = buildReducer();
      if (!_reducer) _reducer = simpleReducer();
      return _reducer.getInitialState();
    },
  };
}

export default createSlice;
