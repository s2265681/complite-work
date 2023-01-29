import proc from "./proc";
import channel from "./channel.js";

/**
 * 生成sagaMiddleware的工厂方法
 * @author lianxc
 * @return {oject} {sagaMiddleware} 返回符合redux中间件标准的sagaMiddleware
 */
export default function sagaMiddlewareFactory() {
  let _store; //闭包store，后续sagaMiddleware可以访问到
  function sagaMiddleware(store) {
    _store = store;
    return (next) => (action) => {
      next(action);
      channel.put(action);
    };
  }
  // 启动rootSaga，即进行入口saga的自执行
  sagaMiddleware.run = function (rootSaga) {
    let iterator = rootSaga();
    proc(iterator, _store);
  };
  return sagaMiddleware;
}
