import compose from "./compose";

// 对 dispatch 进行拦截 加工
// 函数 签名 规范 ({ getState, dispatch }) => next => action
// 扩展 dispatch 的唯一标准的方式

//  enhancer(createStore)(reducer, preloadedState);
// export default function applyMiddleware(middleware) {
//   return (createStore) => (reducer, preloadedState) => {
//     const { subscribe, dispatch, getState } = createStore(
//       reducer,
//       preloadedState
//     );

//     function _dispatch(action) {
//       middleware({ subscribe, dispatch, getState })(dispatch)(action);
//     }

//     return {
//       subscribe,
//       dispatch: _dispatch,
//       getState,
//     };
//   };
// }

export default function applyMiddleware(...middlewares) {
  return (createStore) =>
    (...args) => {
      const store = createStore(...args);
      let dispatch = () => {};
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };

      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
}
