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

#### 实现懒加载

> 实现原理 通过 ast 解析 将 import 语法 进行拆分 分成和 main 相互独立的 chunk， 根据不同的 chunk emit 成不同的模块  
> 实现了 webpack.e webpack.t 在 e 中主要是返回了 promise 格式的代码 将 chunkid = resolve 创建 script 标签 src 等于 chunkid
> 在每次异步执行时 都会创建一个 script 标签 后面通过 installedChunk 全局维护 加入缓存 如果创建过 就直接然后 promise.resolve 否则在进行上步骤

- index.js

```js
let button = document.createElement("button");
button.innerHTML = "按钮";
button.addEventListener("click", function () {
  debugger;
  import("./hello").then((result) => {
    console.log(result.default);
  });
});

console.log("index");
document.body.appendChild(button);
```

- Compiler 模块
  > 改造的点 按照 import 区分 成两个 chunk main 模块 和 其他模块
  > 替换 import 节点 改为 replaceWithSourceString

```js
// 整个替换上面代码 异步加载我们的代码 封装一下 通过.default 拿到值
nodePath.replaceWithSourceString(`
    __webpack_require__.e("${dependencyChunkId}").then(__webpack_require__.t.bind(__webpack_require__, "${dependencyModuleId}"))
`);

// ... 发射代码阶段 循环chunks 按照不同的chunId 发射不同的ejs模版
 emitFiles() {
    // 发射文件  用数据  渲染模版
    // 用数据渲染
    // 拿到输出到哪个目录下
    console.log(this.chunks,'chunks');
    // 现在 增加 懒加载写法
    Object.keys(this.chunks).forEach(chunkId=>{
        if(chunkId == 'main'){
            let outputFile = path.join(this.config.output.path, this.config.output.filename);
            let moduleTemplateStr = this.getSource(path.join(__dirname, "main.ejs"));
            let bundle = ejs.compile(moduleTemplateStr)({ entryId: this.entryId,modules:this.chunks[chunkId]})
            fs.writeFileSync(outputFile, bundle , 'utf8');
        }else{
            let outputFile = path.join(this.config.output.path, chunkId);
            let chunkTemplateStr = this.getSource(path.join(__dirname, "chunk.ejs"));
            let bundle = ejs.compile(chunkTemplateStr)({ chunkId, modules:this.chunks[chunkId]})
            fs.writeFileSync(outputFile, bundle , 'utf8');
        }
    })
```

- chunk.ejs
```js
window.webpackJsonp("<%-chunkId%>",{
   <%for(moduleId in modules){%> 
     "<%-moduleId%>":(function(module,exports,__webpack_require__){
         <%-modules[moduleId]%>
     }),
   <%}%>
});
```

- main.ejs
```js
(() => {
    var installedModules = []
    var installedChunks = {
        main: 0
    }
    var __webpack_modules__ = {
      <%for(let key in modules){%>
      "<%-key%>": (module, __unused_webpack_exports, __webpack_require__) => {eval(`<%-modules[key]%>`) },
      <%}%>
    };
    function __webpack_require__(moduleId) {
      if(installedModules[moduleId]) {
          return installedModules[moduleId].exports;
      }
      var module = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
      }
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      return module.exports;
    }
    __webpack_require__.o = (obj, chunkId) => obj.hasOwnProperty(chunkId);

    __webpack_require__.e = function(chunkId){
        var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;
        if(installedChunkData !== 0) {
            return new Promise((resolve,reject)=>{
                installedChunks[chunkId] = resolve
                let script = document.createElement('script')
                script.src = chunkId;
                document.body.appendChild(script)
             })
        }else{
            return new Promise(res=> {
                 res()
                installedChunks[chunkId] = 0;
            })
        }
    }
    __webpack_require__.t = function(value){
        value = __webpack_require__(value)
        return {
            default: value
        }
    }
    window.webpackJsonp = (chunkId,moreModules) => {
        for(moduleId in moreModules) {
            __webpack_modules__[moduleId] = moreModules[moduleId]
            installedChunks[chunkId]()
            installedChunks[chunkId] = 0
        }
    }
    __webpack_require__("<%-entryId%>");
  })();
  
```


#### 