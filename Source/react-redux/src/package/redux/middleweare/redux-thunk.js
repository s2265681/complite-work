function createThunkMiddleware() {
  var middleware = function middleware(_ref) {
    var dispatch = _ref.dispatch,
      getState = _ref.getState;
    return function (next) {
      return function (action) {
        // The thunk middleware looks for any functions that were passed to `store.dispatch`.
        // If this "action" is really a function, call it and return the result.
        if (typeof action === "function") {
          // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
          return action(dispatch, getState);
        } // Otherwise, pass the action down the middleware chain as usual
        return next(action);
      };
    };
  };
  return middleware;
}

var thunk = createThunkMiddleware(); // Attach the factory function so users can create a customized version
export default thunk;
