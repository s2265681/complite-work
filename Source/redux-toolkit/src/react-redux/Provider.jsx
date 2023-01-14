import { ReactReduxContext } from "./Context";
function Provider({ store, children, context }) {
  const Context = context || ReactReduxContext;

  const subscribe = store.subscribe;

  return (
    <Context.Provider
      value={{
        store,
        subscribe,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;
