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
            ></WrapperComponent>
          )}
        </ReactReduxContext.Consumer>
      );
    };
  };
};

const WrapperComponent = ({ store, subscribe, ComponentFn, props }) => {
  // subscribe(() => {
  //   console.log("1111", store.getState());
  // });

  const [state, setState] = useState(store.getState());

  console.log(store, subscribe, "store, subscribe");
  useEffect(() => {
    console.log("useEffect");
    subscribe(() => {
      setState(store.getState());
    });
  }, []);

  //消费Context的数据
  return ComponentFn({
    ...props,
    ...state,
    dispatch: store.dispatch,
  });
};
export default connect;
