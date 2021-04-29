## 1、webpack代码分割的方式

- entry配置，通过多个文件来实现
- 动态加载(按需加载) 通过主动使用import来动态加载

- 抽离公共代码，使用`splitChunks`配置类抽取公共代码



## 2、基础概念

| 概念   | 含                                                  |
| :----- | :-------------------------------------------------- |
| Entry  | 入口 Webpack执行第一步，可抽象成输入                |
| module | 模块，一切皆模块，webpack会配置Entry递归所有模块    |
| chunk  | 代码块，一个chunk由多个模块组合，用于代码合并与分割 |
| bundle | webpack打包后的各个文件，一般和chunk一对一的关系    |



## 3、项目初始化

> mkdir lazy_webpack
>
> cd lazy_webpack
>
> cnpm init -y
>
> cnpm i webpack -D



## 4、webpack5初体验

####  4-1、webpack.config.js

#### 4-2、index.js

#### 4-3、hello.js

#### 4-4、main.js  



## 5、entry分割

#### 5-1、 webpack.config.js

```js
let path = require("path");
module.exports = {
  mode: "development",
  entry: {
      index:"./src/index.js",
      login:"./src/login.js",
  },
  devtool:'source-map',
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
```



## 6、按需加载

> import 动态导入



![image-20210429201817475](/Users/rockshang/Library/Application Support/typora-user-images/image-20210429201817475.png)

![image-20210429201830921](/Users/rockshang/Library/Application Support/typora-user-images/image-20210429201830921.png)

#### 6-1、webpack.config.js

```js
let path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool:'source-map',
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
document.body.appendChild(button)
```



#### 6-3、 hello.js

```js
console.log('hello')
```



## 7、splitChunks





## 8、实现webpack







## 9、实现懒加载

#### 9-1 scr/index.js

#### 9-2、rock-pack.js

