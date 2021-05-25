import React from "react";

/**
 * @param {} WrapperComponent 
 * @returns 
 * 高阶函数 将一个函数作为参数和返回值  在其他语言是不可以的
 * 高阶组件 组件可以作为函数的参数和返回值
 */
function widthLogger(WrapperComponent){
  return class extends React.Component{
      componentWillMount(){
          this.start = Date.now();
      }
      componentDidMount(){
          console.log('当前组件花费了'+  (Date.now()  - this.start)  + 'ms');
      }
      render(){
          return <WrapperComponent/>
      }
  }
}

export { widthLogger }