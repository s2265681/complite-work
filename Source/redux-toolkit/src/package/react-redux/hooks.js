// https://github.com/baozouai/redux-source-analysis/blob/main/src/packages/use-sync-external-store/src/useSyncExternalStoreClient.ts#L20
import { ReactReduxContext } from "./Context";
import {
  useState,
  useEffect,
  useContext,
  useSyncExternalStore,
  useDebugValue,
} from "react";

function createSelectorHook(context) {
  const useReduxContext = context || ReactReduxContext;
  return function useSelector(selector) {
    const { store } = useContext(useReduxContext);
    // const [_, setState] = useState();
    // useEffect(() => {
    //   store.subscribe(() => {
    //     setState(Math.random());
    //   });
    // }, [store]);
    // const selectedState = selector(store.getState());
    //   forceUpdate({ inst });
    const selectedState = useSyncExternalStore(store.subscribe, () =>
      selector(store.getState())
    );
    useDebugValue(selectedState);
    return selectedState;
  };
}

export function createDispatchHook(context) {
  const useReduxContext = context || ReactReduxContext;
  return function useDispatch(action) {
    const { store } = useContext(useReduxContext);

    return function (action) {
      store.dispatch(action);
    };
  };
}

const useSelector = createSelectorHook();
const useDispatch = createDispatchHook();
export { useSelector, useDispatch };
