import React from "react";
import PropTypes from 'prop-types'
function createContext() {
  class Provider extends React.Component {
    static value;
    constructor(props, context) {
      super(props);
      Provider.value = props.value;
    }
    static childContextTypes = {
        store: PropTypes.shape({
            getState: PropTypes.func.isRequired,
            dispatch: PropTypes.func.isRequired,
            subscribe: PropTypes.func.isRequired
        })
    }
    // 返回一个对象 这个对象将会是子组件的上下文
    getChildContext() {
      return { store: Provider.value.store };
    }
    // componentWillReceiveProps(nextProps,preState){
    //     Provider.value = nextProps.value;
    // }
    static getDerivedStateFromProps(nextProps, preState) {
      Provider.value = nextProps.value;
      return preState;
    }


    render() {
      return this.props.children;
    }
  }
  class Consumer extends React.Component {
    render() {
      return this.props.children(Provider.value);
    }
  }

  return {
    Provider,
    Consumer,
  };
}
export default createContext;
