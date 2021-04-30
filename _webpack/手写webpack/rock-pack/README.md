## 手写 Webpack 过程

- 1、参数初始化
- 2、创建 Compiler，实例化 compiler，调用 run 方法
- 3、调用 run 方法中的 buildModule 模块 和 emitFile 模块
- 4、buileModule 模块主要是根基路径进行 AST 语法分析，从入口开始递归遍历依赖树，找到所有文件和相对路径，组成 key: value 的数组,
  parse 解析阶段 通过 require 语法获取当前收集的依赖和源码返回， 将 require 改写成**webpack_require** 抹平浏览器平台差异
- 5、emitFile 阶段， 将上文中组好的 key： value 通过模版的形式动态渲染，写到 bundle.js 文件中

### bundle.js 什么意思

bundle.js 是一个自执行函数， webpack5 进行了简化， 主要是一个对象，key 为文件的相对路径，value 是一个函数，里面是用 eval 包裹的文件的执行代码，通过 eval 来执行，里面会通过 module.export 导出结果， 将 require 修改成了自己的**webpack_require** 方法， 在执行的时候，会从入口开始依次执行，传入三个参数，分别为 module、**webpack_exports ，当执行到**weback_require\_\_ 递归执行， 最后将最终的入口文件的 module.export 的结果展示

**webpack_require** 是 webpack 自定义的一个函数 入参是模块的 id，也就是文件的相对路径值， 根据路径执行方法时，返回的是 module.exports ,
最终结果是返回的是 index.js 的 module.exports 的执行结果

### 手写 loader 逻辑

loader 的特点

- 第一个 loader 要返回 js 脚本
- 每个 loader 只做一件内容 为了使 loader 在更多场景链式调用
- 每个 loader 都是一个模块
- 每个 loader 都是无状态的，确保 loader 在不同模块之间转换不保存状态

增加 loader 逻辑

```js
// useLoader
useLoader(content, modulePath) {
let rules = this.rules || [];
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    let { test, use } = rule;
    let len = use.length - 1;
    if (test.test(modulePath)) {
    function nextLoader() {
        let loader = require(use[len--]);
        content = loader(content);
        if (len >= 0) {
        nextLoader();
        }
    }
    nextLoader();
    }
}
return content;
}
```

手写 loader

#### 实现 babel-loader

> cnpm install @babel/core @babel/preset-env loader-utils

```js
let babel = require("@babel/core");
let loaderUtils = require("loader-utils");
function loader(source) {
  let options = loaderUtils.getOptions(this);
  console.log(options, "options");
  console.log(this, "this");
  let cb = this.async();
  babel.transform(
    source,
    {
      ...options,
      sourceMap: true,
      filename: this.resourePath,
    },
    function (err, result) {
      cb(err, result.code);
      console.log(result, "result....");
    }
  );
  return source;
}
module.exports = loader;
```

### 手写 plugin 逻辑

实现发布订阅

> npm i tapable

```js
// 增加生命周期钩子
this.hooks = {
  entryOption: new SyncHook(),
  compile: new SyncHook(),
  afterCompiler: new SyncHook(),
  afterPlugins: new SyncHook(),
  run: new SyncHook(),
  emit: new SyncHook(),
  done: new SyncHook(),
};
```

```js
// useLoader
useLoader(content, modulePath) {
let rules = this.rules || [];
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    let { test, use } = rule;
    let len = use.length - 1;
    if (test.test(modulePath)) {
    function nextLoader() {
        let loader = require(use[len--]);
        content = loader(content);
        if (len >= 0) {
        nextLoader();
        }
    }
    nextLoader();
    }
}
return content;
}
```



#### 

