import React, { Component } from 'react'
import axios from 'axios';
import Loading from '../Loading'

interface ILoaderState{
    data:any;
    isLoading:boolean;
}

interface ILoaderProps{
    data:any;
}

// class HigherOrderComponent extends Component {
// 高阶组件 就是一个函数， 接收一个组件  返回一个新的组件
// 纯函数-》 接收一个函数，返回一个新的函数
// 副作用函数，在函数内进行一些操作行为
const withLoader =  <P extends ILoaderState> (WrappedComponent:React.ComponentType<P> , url:string)=>{
    return class LoaderComponent extends React.Component<Partial<ILoaderProps>,ILoaderState>{
        constructor(props:any){
            super(props);
            this.state = {
                data:null,
                isLoading:false
            }
        }
    componentDidMount(){
        this.setState({
            isLoading:true
        })
        axios.get(url).then(result=>{
            this.setState({
                data:result.data,
                isLoading:false
            })
        })
    }
    
    render() {
        const {data,isLoading} = this.state;
        return (
            <>
               {
                   (isLoading || !data) ? <Loading/> : 
                   <WrappedComponent {...this.props as P} data = {data}/> 
               }  
            </>
        )
    } 
  }
}

export default  withLoader;