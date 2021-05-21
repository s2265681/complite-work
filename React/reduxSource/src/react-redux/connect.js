import React from "react";
import ReactReduxContext from "./ProviderContext";
import bindActionCreators from "../redux/bindActionCreators"

/**
 * 
 * @param {} mapStateFromProps 
 * @param {*} actions 
 * @returns  {Function}  
 * 自方法负责把组件库和仓库进行关联链接
 */
function connect(mapStateFromProps, actions) {
  return function (WrapComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext;
      constructor(props, context) {
        super(props);
        this.state = mapStateFromProps(context.store.getState());
        this.bindAction = bindActionCreators(actions, context.store.dispatch);
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe((oldstate,newstate) => this.setState(mapStateFromProps(this.context.store.getState())))
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return <WrapComponent {...this.state} {...this.bindAction}/>;
      }
    };
  };
}

export default connect;
