import { ReactReduxContext } from "./Context";
import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { useWhyDidYouUpdate } from "ahooks";

const connect = (mapStateToProps, mapDispatchToProps) => {
  return function (ComponentFn) {
    return (props) => {
      return (
        <WrapperComponent
          ComponentFn={ComponentFn}
          props={props}
          mapStateToProps={mapStateToProps}
          mapDispatchToProps={mapDispatchToProps}
        ></WrapperComponent>
      );
    };
  };
};
const WrapperComponent = ({
  ComponentFn,
  props,
  mapStateToProps,
  mapDispatchToProps,
}) => {
  const { store, subscribe } = useContext(ReactReduxContext);
  const selectorStateRef = useRef(null);
  try {
    selectorStateRef.current = mapStateToProps(store.getState()) || {};
  } catch (error) {}
  const [state, setState] = useState(selectorStateRef.current);
  const initDispatch = mapDispatchToProps
    ? mapDispatchToProps(store.dispatch)
    : {};

  useEffect(() => {
    subscribe(() => {
      selectorStateRef.current = mapStateToProps(store.getState()) || {};
      setState(selectorStateRef.current);
    });
  }, []);

  // 这里简化有些问题
  const propsChange = useMemo(() => {
    let keys = Object.keys(props);
    let result = null;
    keys.map((el) => {
      if (selectorStateRef.current?.[el] !== props[el]) {
        // selectorStateRef.current[el] = props[el];
        result = { ...props };
      }
      return [];
    });
    return result;
  }, [props]);

  // 只有当最后一个更新了 才更新
  const renderedWrappedComponent = useMemo(() => {
    console.log(ComponentFn.name, props, state);
    return (
      // @ts-ignore
      ComponentFn({
        ...props,
        ...state,
        dispatch: store.dispatch,
        ...initDispatch,
      })
    );
    // }, [state, propsChange]);
  }, [ComponentFn, props, state, store.dispatch, initDispatch]);

  // console.log(useWhyDidYouUpdate(">>>", state, propsChange));

  return renderedWrappedComponent;
};

export default connect;
