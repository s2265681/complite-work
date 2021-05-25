import React from "react";
import bindActionCreators from "../redux/bindActionCreators";
/**
 *
 * @param {} mapStateToProps
 * @param {*} actions
 * @returns  {Function}
 * 自方法负责把组件库和仓库进行关联链接
 *  mapStateToProps 将state进行拆分 配合浅比较进行优化
 */
function connect(mapStateToProps, actions) {
  return function (WrapComponent) {
    return class extends React.Component {
      static ContextTypes = {
        store: PropTypes.shape({
          getState: PropTypes.func.isRequired,
          dispatch: PropTypes.func.isRequired,
          subscribe: PropTypes.func.isRequired,
        }),
      };
      constructor(props, context) {
        super(props);
        this.state = mapStateToProps(context.store.getState());
        if (typeof actions === "function") {
          this.bindAction = actions(context.store.dispatch);
        } else {
          this.bindAction = bindActionCreators(actions, context.store.dispatch);
        }
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe((oldstate, newstate) =>
          this.setState(mapStateToProps(this.context.store.getState()))
        );
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return <WrapComponent {...this.state} {...this.bindAction} />;
      }
    };
  };
}

export default connect;
