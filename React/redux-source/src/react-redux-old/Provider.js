import React from "react";
import { func, number, shape } from 'prop-types';

export default class extends React.Component {
  static childContextTypes = {
      store: shape({
          getState: func.isRequired,
          dispatch: func.isRequired,
          subscribe: func.isRequired
      })
  }
  // 返回一个对象 这个对象将会是子组件的上下文
  getChildContext(){
      return { store: this.props.store } 
  }
  
  render() {
    return this.props.children
  }
}
