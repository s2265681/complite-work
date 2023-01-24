export function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }

      return {
        type,
        payload: prepared.payload,
        ...("meta" in prepared && { meta: prepared.meta }),
        ...("error" in prepared && { error: prepared.error }),
      };
    }
    return { type, payload: args[0] };
  }

  actionCreator.toString = () => `${type}`;

  actionCreator.type = type;

  actionCreator.match = (action) => action.type === type;

  return actionCreator;
}
