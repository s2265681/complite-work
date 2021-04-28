# 使用 TypeScript 结合 React 打造 Ui 组件库

## 项目初始化

npx create-react-app rockui --typescript
npx 和 npm 比较，不用全局安装项目，会拉最新的库初始化项目后自动删除，可以直接 path 到 node_module/.bin 中执行库，代替拉 npm run package.js / script 中的 sheel 脚本

yarn add typescript @types/node @types/react @types/react-dom @types/jest

## 什么是 React Hook

- react hook 是 react16.8 带来的全新特性，即将替代 class 组件的写法
- 没有破坏性改动
- 完全可选
- 百分之百向后兼容，没有计划从 React 移除 class，可以渐进式的尝试使用 Hook

## 为什么使用 hooks，解决了什么问题

1、解决了组件很难复用状态逻辑
2、复杂组件难以理解，尤其是生命周期函数，容易造成逻辑不一致，不清晰
3、React 组件一直是函数，使用 Hook 完全拥抱函数

## React-Hooks

是什么？特殊的函数
什么时候使用 useState Hook？
下面实现一个点赞组件

```js
import React,{useState} =
const LikeButton : React.FC = () => {
    const [obj,setLikeObj] = useState({like:0,on:true});
    return(
        <>
        <button onClick={()=>setLike({like: obj.like+1, on:obj.on})}>
            {like} 👍
        </button>
         <button onClick={()=>setLike({like: obj.like+1, on:!obj.on})}>
           {obj.on? "ON":"OFF"}
        </button>
        </>
    )
}
export default LikeButton;
```

<!-- 随机获取网络请求 -->
<!-- https://dog.ceo/api/breeds/image/random -->

# 是一种模式，react 中

高阶组件是一个函数，接受一个组件作为参数，返回一个新的组件

把一个组件转化为另一个组件

区别： 多了一些属性供以后使用 。

HOC 的弊端，需要添加节点，难以理解，HOC 概念不好理解
数据不明白哪里来

自定义 hook 解决这个问题

# useRef

解决了什么问题

组件中的 state，问题是什么

在任意一次渲染中，state 和 props 是独立的
验证，点击事件中加一个延迟产生 alert(count)

怎么让不同的渲染中的 state 产生联系呢

-----》 useRef 产生了

// {current:0}
// ref 在不同渲染中拿到的是最终的值
修改 ref 是不会触发再次渲染的
如果需要触发更新，需要 useEffect 配合

## 安装 react-router

cnpm i @types/react-router-dom
npm i react-router-dom

配置路由懒加载
。。。。

## 安装 less

npm install less-loader less --save

npm run eject

[tip](https://www.jianshu.com/p/d5dd8b108461)

## 默认为 sass

cnpm i node-sass

## 打包部署

修改 package.json
添加"homepage": ".",

## port

port 3001

## 项目集

[服务器地址](http://project.rockshang.cn/items/)
[github 地址](https://s2265681.github.io/code/React_Hook_UI/HookWithTypeScript/build/index.html)
