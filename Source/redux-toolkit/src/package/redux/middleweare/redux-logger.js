function createThunkMiddleware() {
  var logger = function logger(_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        console.log("will dispatch", action);
        // 调用 middleware 链中下一个 middleware 的 dispatch。
        const returnValue = next(action);
        console.log("state after dispatch", getState());
        // 一般会是 action 本身，除非
        // 后面的 middleware 修改了它。
        return returnValue;
      };
    };
  };
  return logger;
}

var logger = createThunkMiddleware(); // Attach the factory function so users can create a customized version
export default logger;
