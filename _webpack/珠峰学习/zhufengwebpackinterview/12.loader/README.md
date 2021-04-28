## 1. loader 运行的总体流程

![webpackflowloader](http://img.zhufengpeixun.cn/webpackflowloader.jpg)

![loader-runner2](http://img.zhufengpeixun.cn/loader-runner2.jpg)

## 2.loader-runner
### 2.1 loader 类型

- [loader 的叠加顺序](https://github.com/webpack/webpack/blob/v4.39.3/lib/NormalModuleFactory.js#L159-L339) = post(后置)+inline(内联)+normal(正常)+pre(前置)

### 2.2 特殊配置

- [loaders/#configuration](https://webpack.js.org/concepts/loaders/#configuration)

| 符号 | 变量                 | 含义                                    |
| :--- | :------------------- | :-------------------------------------- |
| `-!` | noPreAutoLoaders     | 不要前置和普通 loader                   | Prefixing with -! will disable all configured preLoaders and loaders but not postLoaders |
| `!`  | noAutoLoaders        | 不要普通 loader                         | Prefixing with ! will disable all configured normal loaders |
| `!!` | noPrePostAutoLoaders | 不要前后置和普通 loader,只要内联 loader | Prefixing with !! will disable all configured loaders (preLoaders, loaders, postLoaders) |

### 2.3 查找并执行

```js
let path = require("path");
let nodeModules = path.resolve(__dirname, "node_modules");
let request = "-!inline-loader1!inline-loader2!./index.js";
//首先解析出所需要的 loader，这种 loader 为内联的 loader
let inlineLoaders = request
  .replace(/^-?!+/, "")
  .replace(/!!+/g, "!")
  .split("!");
let resource = inlineLoaders.pop(); //// 获取资源的路径
let resolveLoader = (loader) => path.resolve(nodeModules, loader);
//从相对路径变成绝对路径
inlineLoaders = inlineLoaders.map(resolveLoader);
let rules = [
  {
    enforce: "pre",
    test: /\.css?$/,
    use: ["pre-loader1", "pre-loader2"],
  },
  {
    test: /\.css?$/,
    use: ["normal-loader1", "normal-loader2"],
  },
  {
    enforce: "post",
    test: /\.css?$/,
    use: ["post-loader1", "post-loader2"],
  },
];
let preLoaders = [];
let postLoaders = [];
let normalLoaders = [];
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i];
  if (rule.test.test(resource)) {
    if (rule.enforce == "pre") {
      preLoaders.push(...rule.use);
    } else if (rule.enforce == "post") {
      postLoaders.push(...rule.use);
    } else {
      normalLoaders.push(...rule.use);
    }
  }
}
preLoaders = preLoaders.map(resolveLoader);
postLoaders = postLoaders.map(resolveLoader);
normalLoaders = normalLoaders.map(resolveLoader);

let loaders = [];
//noPrePostAutoLoaders  忽略所有的 preLoader / normalLoader / postLoader
if (request.startsWith("!!")) {
  loaders = inlineLoaders; //只保留inline
  //noPreAutoLoaders 是否忽略 preLoader 以及 normalLoader
} else if (request.startsWith("-!")) {
  loaders = [...postLoaders, ...inlineLoaders]; //只保留post和inline
  //是否忽略 normalLoader
} else if (request.startsWith("!")) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]; //保留post inline pre
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}
console.log(loaders);
```

![commonloaderexec](http://img.zhufengpeixun.cn/commonloaderexec.png)

## 2.4 pitch

- 比如 a!b!c!module, 正常调用顺序应该是 c、b、a，但是真正调用顺序是 a(pitch)、b(pitch)、c(pitch)、c、b、a,如果其中任何一个 pitching loader 返回了值就相当于在它以及它右边的 loader 已经执行完毕
- 比如如果 b 返回了字符串"result b", 接下来只有 a 会被系统执行，且 a 的 loader 收到的参数是 result b
- loader 根据返回值可以分为两种，一种是返回 js 代码（一个 module 的代码，含有类似 module.export 语句）的 loader，还有不能作为最左边 loader 的其他 loader
- 有时候我们想把两个第一种 loader chain 起来，比如 style-loader!css-loader!
  问题是 css-loader 的返回值是一串 js 代码，如果按正常方式写 style-loader 的参数就是一串代码字符串
- 为了解决这种问题，我们需要在 style-loader 里执行 require(css-loader!resources)

pitch 与 loader 本身方法的执行顺序图

```js
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```

![loader_pitch](http://img.zhufengpeixun.cn/loader_pitch.jpg)

### 2.1 loaders\loader1.js

loaders\loader1.js

```js
function loader(source) {
  console.log("loader1", this.data);
  return source + "//loader1";
}
loader.pitch = function (remainingRequest, previousRequest, data) {
  data.name = "pitch1";
  console.log("pitch1");
};
module.exports = loader;
```

### 2.2 loaders\loader2.js

loaders\loader2.js

```js
function loader(source) {
  console.log("loader2");
  return source + "//loader2";
}
loader.pitch = function (remainingRequest, previousRequest, data) {
  console.log("remainingRequest=", remainingRequest);
  console.log("previousRequest=", previousRequest);
  console.log("pitch2");
  //return 'console.log("pitch2")';
};
module.exports = loader;
```

### 2.3 loaders\loader3.js

loaders\loader3.js

```js
function loader(source) {
  console.log("loader3");
  return source + "//loader3";
}
loader.pitch = function () {
  console.log("pitch3");
};
module.exports = loader;
```

### 3.4 webpack.config.js

```js
module.exports = {
   resolveLoader: {
    alias: {
      'a-loader': path.resolve(__dirname, 'loaders/a.js')
    },
     modules: [path.resolve(__dirname, 'node_modules'),path.resolve(__dirname, 'loader')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['loader1', 'loader2', 'loader3']
      }
    ]
  }
}
```


![pitchloaderexec](http://img.zhufengpeixun.cn/pitchloaderexec.png)

