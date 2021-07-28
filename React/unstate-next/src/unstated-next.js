import React, { createContext, useContext } from "react";

// 简版源码
// 实现原理 通过createContext 提供的 Provider包裹，调用 useHooks并传入初始值 和 useContext 获取最新状态
// 问题？ 参数通过Proveder传入怎么获取？ 重写Context的Provider
export function createContainer(useHook) {
  let Context = createContext(null);
  const Provider = function Provider(props) {
    let value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  };
  const useContainer = function () {
    let value = useContext(Context);
    return value;
  };
  return {
    Provider,
    useContainer,
  };
}
