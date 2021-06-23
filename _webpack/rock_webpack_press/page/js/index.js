
// import createEle from '../component/header/header.js'
// let h = createEle();
// document.body.append(h)

// 解析一个README文件
// import ReadeMe1 from '../component/ReadeMe/README1.md'
// import ReadeMe2 from '../component/ReadeMe/README2.md'

// let d1 = document.createElement('div')
// d1.innerHTML = ReadeMe1;
// let d2 = document.createElement('div')
// d2.innerHTML = ReadeMe2;
// document.body.append(d2)

// console.log('index+')

// 开启来hml模式，支持module.hot
// if(module.hot){
//    module.hot.accept('../component/header/header',()=>{
//        console.log('header change')
//    })
// }

// 测试 es6 语法
// import '@babel/polyfill'
// const arr = [
//     new Promise(()=>{}),
//     new Promise(()=>{})
// ]
// arr.map(item=>{
//     console.log(item)
// })

// 使用react
import React,{ Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component{
    render(){
        return <div>Hello World</div>
    }
}
ReactDom.render(<App></App>,document.getElementById('root'))