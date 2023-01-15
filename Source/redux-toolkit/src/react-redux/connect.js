//connect(mapStateToProps, mapDispatchToProps)(Component)
import { ReactReduxContext } from "./Context";
import { useState, useEffect } from "react";

const connect = (mapStateToProps, mapDispatchToProps) => {
  console.log(
    "mapStateToProps, mapDispatchToProps",
    mapStateToProps,
    mapDispatchToProps
  );
  return function (ComponentFn) {
    return (props) => {
      return (
        <ReactReduxContext.Consumer>
          {({ store, subscribe }) => (
            <WrapperComponent
              store={store}
              subscribe={subscribe}
              ComponentFn={ComponentFn}
              props={props}
              mapStateToProps={mapStateToProps}
              mapDispatchToProps={mapDispatchToProps}
            ></WrapperComponent>
          )}
        </ReactReduxContext.Consumer>
      );
    };
  };
};

const WrapperComponent = ({
  store,
  subscribe,
  ComponentFn,
  props,
  mapStateToProps,
  mapDispatchToProps,
}) => {
  const initstate = mapStateToProps(store.getState()) || {};
  const [state, setState] = useState(initstate);
  console.log(store, subscribe, "store, subscribe");

  const initDispatch = mapDispatchToProps(store.dispatch);
  console.log(initDispatch, "initDispatch...");

  useEffect(() => {
    console.log("useEffect");
    subscribe(() => {
      setState(mapStateToProps(store.getState()));
    });
  }, []);

  //消费Context的数据
  return ComponentFn({
    ...props,
    ...state,
    dispatch: store.dispatch,
    ...initDispatch,
  });
};
export default connect;
