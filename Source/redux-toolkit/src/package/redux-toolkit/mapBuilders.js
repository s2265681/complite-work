export function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer = undefined;

  const builder = {
    addCase(typeOrActionCreator, reducer) {
      const type =
        typeof typeOrActionCreator === "string"
          ? typeOrActionCreator
          : typeOrActionCreator.type;
      if (type in actionsMap) {
        throw new Error(
          "addCase cannot be called with two reducers for the same action type ;;"
        );
      }
      actionsMap[type] = reducer;
      return builder;
    },
  };

  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
