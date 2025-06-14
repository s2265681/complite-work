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

## 4、具体实现

- （1）搭建结构，读取配置
- （2）用配置参数对象初始化 `Compiler` 对象
- （3）挂载配置文件中的插件
- （4）执行 `Compiler` 对象的 `run` 方法开始执行编译
- （5）根据配置文件中的 `entry` 配置项找到所有的入口
- （6）从入口文件出发，调用配置的 `loader` 规则，对各模块进行编译
- （7）找出此模块所依赖的模块，再对依赖模块进行编译
- （8）等所有模块都编译完成后，根据模块之间的依赖关系，组装代码块 `Chunk`
- （9）把各个代码块 `chunk` 转换成一个一个文件加入到输出列表
- （10）确定好输出内容之后，根据配置的输出路径和文件名，将文件内容写到文件系统

## 5、架构设计

- 打包开始前的准备工作
- 打包过程中 （编译阶段 -- watch mode）
- 打包结束后 （包含打包成功和打包失败）

compiler 是一个大管家
compilation 是专门负责伙食的厨师， 专门负责编译相关工作，
![compiler](https://mmbiz.qpic.cn/mmbiz/3JxC1BeqGrn276R1LfrGx97DRyEOIc0W1dY5O08jcwibtibIvyFalsAiahsPV267G5pEBLqHWCqiarzGzj0pzsibuSA/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1)
