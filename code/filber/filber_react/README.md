

# JSX是一种特殊的语法，看起来像html，但是是js代码，webpack打包 通过babel转化成，React.createElememnt('div',{id:'A1'}React.createElememnt('div',{id:'A2'}))

// React.createElement("div",)

jsx -> js 用的babel 内部就是ast

1、 虚拟DOM

2、初次渲染

为什么单向设计： 父亲找儿子，儿子找兄弟，兄弟找叔叔，最后指回父亲，形成闭环
单环才能形成闭环，一遍走完这颗树，先序 后序


3、