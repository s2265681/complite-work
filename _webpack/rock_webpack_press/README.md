#

注意：

- 默认打包的是 src 下面的 index.js, 也可以 npx webpack index.js 来指定打包
- webpack-cli 3.3.1 用有注释版

/\*\*

- 添加类型注解
- @type { import('webpack').Configuration}
  \*/

### entry、output

- entry 和 output 的意思和写法

### loader

webpack 默认解析 js 结尾的文件，其他格式的都需要同构 loader 来解析，如 vue-loader

- 配置支持图片、字体、css、sass 等 loader
  postcss-loader 安装需要安装 node-sass
- 自己实现一下将.md 文件转化成 html 的 loader

```js
module: {
  rules: [
    {
      test: /\.jpg$/,
      use: {
        loader: "file-loader",
      },
    },
  ];
}
```

> 自己实现一下将.md 文件转化成 html 的 loader
> npm i marked -D
> 新建一个 markdown-loader.js 的文件

```js
```

### plugin

1、 CleanWebpackPlugin
2、 HtmlWebpackPlugin

```js
配置： new webpack.HotModuleReplacementPlugin(),
// 开启来hml模式，支持module.hot
if(module.hot){
  module.hot.accept('../component/header/header',()=>{
      console.log('header change')
  })
}
```

3、 copy-webpack-plugin
4、 实现一个去除注释的 plugin

```js
new CopyWebpackPlugin({
  patterns: [
    { from: path.join(__dirname, "markdown"), to: "markdown" },
    { from: path.join(__dirname, "page/image"), to: "image" },
  ],
});
```

> 开发一个去除注释的插件

```js
class RemoveCommentsPlugin {
  apply(complier) {
    // complier 中包含来我们此次构建所以配置
    // console.log(complier, "complier");
    complier.hooks.emit.tap("RemoveCommentsPlugin", (complier) => {
      // complier 可以理解为此次打包的上下文
      for (const name in complier.assets) {
        // console.log(name, "name>>"); // 输出文件名称
        if (name.endsWith(".js")) {
          const contents = complier.assets[name].source();
          const noComments = contents.replace(/\/\*+\//g, "");
          complier.assets[name] = {
            source: () => noComments,
            size: () => noComments.length,
          };
        }
      }
    });
  }
}
module.exports = RemoveCommentsPlugin;
```

### 热更新

- --watch
- 使用 webpack devServer
- 自己写一个服务

### 配置 devtool

[](https://www.webpackjs.com/configuration/devtool/)
devtool:'cheap-module-eval-source-map'
devtool:'cheap-module-source-map'

### 结合 bable 编写 es6 语法

[](https://www.babeljs.cn/docs/)

```js
解析下面的代码;
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map((item) => {
  console.log(item);
});
```

> cnpm install --save-dev babel-loader @babel/core
> babel-loader 并不会翻译 es6 语法 只是打通 webpack 的通道
> cnpm install --save-dev @babel/preset-env
> @babel/preset-env 中安装了所有的 es6 转 es5 的规则, 语法转化
> cnpm install --save-dev @babel/polyfill
> @babel/polyfill 补充@babel/preset-env 对部分 es6 代码转化的不足，但是包会很大
> 使用的时候需要在入口引入 import '@babel/polyfill'

```js
 options:{
  presets:[[
        '@babel/preset-env',{
            targets:{
              chrome:'67',
              },
            useBuiltIns:'usage'  // 按需引入@babel/polyfill
        }
      ]]
  }
  ```

> cnpm install --save-dev @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs2
> 上面一种方式是业务代码常用的，下面这种是封装类库常用的配置方法

 ```js
 options:{
    "plugins": [["@babel/plugin-transform-runtime",{
          "corejs":2,
          "helpers":true,
          "regenerator":true,
          "useESModulrs":false
      }]]
}
```

presets 和 plugins 引入的区别， 前者@babel/polyfill 会污染全局变量，后者通过闭包形式实现，对于封装类库等更合理

### 配置react环境
[](https://www.babeljs.cn/docs/babel-preset-react)

cnpm i react react-dom -S
cnpm install --save-dev @babel/preset-react

