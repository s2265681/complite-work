import React from "react";
function createContext() {
  class Provider extends React.Component {
    static value;
    constructor(props,context) {
      super(props);
      Provider.value = props.value;
      console.log(context,'?');
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
