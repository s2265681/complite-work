import isPlainObject from "lodash.isplainobject";
import isString from "lodash.isstring";

function isPromise(fn) {
  if (typeof fn.then === "function") {
    return true;
  }
  return false;
}

function isValidKey(key) {
  return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}

function isFSA(action) {
  return (
    isPlainObject(action) &&
    isString(action.type) &&
    Object.keys(action).every(isValidKey)
  );
}

export default function promiseMiddleware({ dispatch }) {
  return (next) => (action) => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    return isPromise(action.payload)
      ? action.payload
          .then((result) => dispatch({ ...action, payload: result }))
          .catch((error) => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
}
