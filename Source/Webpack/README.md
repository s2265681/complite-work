# Webpack

## 1、 参考

[webpack 原理](https://mp.weixin.qq.com/s/mL_GRKm4_6kCHBCe9715VQ)

> 实现 Webpack 原理

- Webpack 本质上是一个函数，它接受一个配置信息作为参数，执行后返回一个 `compiler` 对象，调用 compiler 对象中的 run 方法，就会执行启动编译。 `run` 方法接受一个回调，可以用来查看编译过程中的错误信息或编译信息。

> 编译打包

## 2、 目标

- 从模块化产物洞悉模块化原理
- Webpack 异步加载（懒加载实现原理）
- AST 抽象语法树的实现原理
- Webpack 的 Loader 机制
- Webpack 的插件
- Tapable 源码

## 3、 基本使用

```js
npm init
yarn add webpack
node ./debugger.js // 执行打包命令
```
