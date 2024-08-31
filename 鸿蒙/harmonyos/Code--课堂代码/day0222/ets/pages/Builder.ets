//构建函数
//1. 某项内容的值就是 构建函数
//2. 页面抽取组件后，组件又有很多类似的区域，抽取为构建函数
// 可以导入导出
// 组件内---全局范围

import {Header}  from "../components/BuilderCom/Header"
import {Main}  from "../components/BuilderCom/Main"

@Entry
@Component
struct Index {

  build(){
    Column(){
      Header()
      Main()
      Footer()
    }.height("100%")
    .width("100%")
  }
}

@Component
struct Footer {
  build(){
    Column(){
      Text("Footer")
    }.height(100)
    .width("100%")
  }
}