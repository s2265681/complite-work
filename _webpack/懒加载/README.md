## 1、webpack 代码分割的方式

- entry 配置，通过多个文件来实现
- 动态加载(按需加载) 通过主动使用 import 来动态加载

- 抽离公共代码，使用`splitChunks`配置类抽取公共代码

## 2、基础概念

| 概念   | 含                                                    |
| :----- | :---------------------------------------------------- |
| Entry  | 入口 Webpack 执行第一步，可抽象成输入                 |
| module | 模块，一切皆模块，webpack 会配置 Entry 递归所有模块   |
| chunk  | 代码块，一个 chunk 由多个模块组合，用于代码合并与分割 |
| bundle | webpack 打包后的各个文件，一般和 chunk 一对一的关系   |

## 3、项目初始化

> mkdir lazy_webpack
>
> cd lazy_webpack
>
> cnpm init -y
>
> cnpm i webpack -D

## 4、webpack5 初体验

#### 4-1、webpack.config.js

#### 4-2、index.js

#### 4-3、hello.js

#### 4-4、main.js

## 5、entry 分割

#### 5-1、 webpack.config.js

```js
let path = require("path");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

## 6、按需加载

> import 动态导入(在需要的时机触发，异步执行才是按需加载), webpack 当遇到 import 时，会把这个 import 的模块单独独立到一个代码快里，这个代码块会单独生成一个文件
>
> 首次加载值加载 main.js 当遇到 import 语句时，会想服务器发送一个 jsonp 请求，请求被分割出去异步代码，然后合并到原来 modules，然后加载这个新的模块，把模块的 exports 导出对象向后传递

![image-20210429201817475](/Users/rockshang/Library/Application Support/typora-user-images/image-20210429201817475.png)

![image-20210429201830921](/Users/rockshang/Library/Application Support/typora-user-images/image-20210429201830921.png)

#### 6-1、webpack.config.js

```js
let path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

#### 6-2、index.js

```js
let button = document.createElement("button");
button.innerHTML = "按钮";
button.addEventListener("click", function () {
  import("./hello").then((result) => {
    console.log(result.default);
  });
});

console.log("index");
document.body.appendChild(button);
```

#### 6-3、 hello.js

```js
console.log("hello");
```

## 7、splitChunks

- webpack 奖给予以下条件自动分割代码块
  - 新的代码被共享或者来自 node_modules 文件夹
  - 新的代码块大雨 30kb
  - 按需加载代码块的请求数量应该<=5
  - 页面初始化时加载代码块的请求数量<=3

webpack.config.js

```js
let path = require("path");

module.exports = {
  mode: "development",
  entry: {
    page1: "./src/page1.js",
    page2: "./src/page2.js",
    page3: "./src/page3.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: "initial", // 指定分割类型， 3种类型 all 、 async 异步(默认)、initial 同步
          name: "vendors", // 给分割出去的代码块起一个名字叫vendors
          test: /node_modules/, // 如果模块路径匹配这个正则的话，就会添加一个vendors代码块
          priority: -10, // 优先级
        },
        commons: {
          chunks: "initial",
          name: "commons",
          minSize: 0, // 最小提取字节 大于多少才用提取
          minChunks: 2, //最少被几个chunk引用提取
          priority: -20,
        },
      },
    },
  },
};
```

## 8、实现 webpack

## 9、实现懒加载

#### 9-1 scr/index.js

#### 9-2、rock-pack.js
