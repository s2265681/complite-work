function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

// 传入的 actionCreators 是函数，返回一个绑定dispatch 的函数
// 传入的 actionCreators 是对象，返回一个对象， key为对象的key，value 是与dispatch 绑定的函数
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error(
      'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
    );
  }
  var boundActionCreators = {};
  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
