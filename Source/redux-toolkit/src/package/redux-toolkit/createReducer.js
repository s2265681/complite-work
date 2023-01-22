import createNextState, { isDraft, isDraftable } from "immer";

function freezeDraftable(val) {
  return isDraftable(val) ? createNextState(val, () => {}) : val;
}

function createReducer(
  initialState,
  mapOrBuilderCallback,
  actionMatchers,
  defaultCaseReducer
) {
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] =
    typeof mapOrBuilderCallback === "function"
      ? executeReducerBuilderCallback(mapOrBuilderCallback)
      : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer];

  // 变为immer
  let getInitialState = () => freezeDraftable(initialState);

  function reducer(state = getInitialState(), action) {
    let caseReducers = [
      actionsMap[action.type],
      ...finalActionMatchers
        .filter(({ matcher }) => matcher(action))
        .map(({ reducer }) => reducer),
    ];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }

    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === undefined) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === undefined) {
            if (previousState === null) {
              return previousState;
            }
          }
          return result;
        } else {
          return createNextState(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }

  reducer.getInitialState = getInitialState;
  return reducer;
}
export default createReducer;

function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer = undefined;

  const builder = {
    addCase(typeOrActionCreator, reducer) {
      const type =
        typeof typeOrActionCreator === "string"
          ? typeOrActionCreator
          : typeOrActionCreator.type;
      actionsMap[type] = reducer;
      return builder;
    },
    addMatcher(matcher, reducer) {
      actionMatchers.push({ matcher, reducer });
      return builder;
    },
    addDefaultCase(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    },
  };

  builderCallback(builder);

  return [actionsMap, actionMatchers, defaultCaseReducer];
}
