import React from 'react'

export default class PureComponent extends React.Component{
    static isPureComponent = true;
    shouldComponentUpdate(nextProps){
        // 询问组件是否需要刷新
       let oldProps = this.props;
       if( oldProps === null || typeof oldProps !== 'object' || nextProps === null || typeof nextProps !== 'object'){
          return true
       }
       if(Object.keys(oldProps).length !==Object.keys(nextProps).length){
        return true
       }
       for (const oldKey in oldProps) {
           if(!nextProps.hasOwnProperty(oldKey) || nextProps[oldKey] !== oldProps[oldKey] ){
            return true
           }
       }
       return false
    }
}

