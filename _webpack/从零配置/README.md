# 从零配置 Webpack

[链接](https://www.yuque.com/zhongyangweizao/wheel/lybcgv/edit#eZmEq)

## webpack 的配置

### webpack 安装

npm i webpack@4.44.2 webpack-cli@3.3.11 -D
npx webpack

### 配置 html 模版

html-webpack-plugin

### clean-webpack-plugin

### webpack-dev-server

## webpack 的优化

## 说明 配置 dev build serve

当用 npm run dev 时 使用的是监听文件变化 ， 对 react 做了 dll 处理， 需要提前 npm run dll 一下 ， 默认已做
当用 npm run serve 时 使用的是 devServer 在内存读取， 速度块
当用 npm run build 时，用的生产环境 devtool 等

开发环境优化主要时，要速度更快， 更好进行调试， watch 监听，dllReferPlugin， devtool， excludes 等
热模块更新，其他模块用缓存
使用懒加载

```js
if（module.hot）{
        module.hot.accept('./**.js',function(){ //有几个模块，就写多少个，
        //监听**.js文件，一旦发生变化，其他模块将不会重新打包
        })
    }
```

生产环境的优化，主要是，devtool 模式， 、优化打包构建速度
1、 开启 babel 缓存
2、happyPack 让打包更快
3、 externals 拒绝某些包打入文件
4、tree-shaking
5、scope hosting 计算提升
6、PWA 离线技术访问

```js
//webpack.config.js
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
plugins: [
  new MiniCssExtractPlugin({
    filename: "css/style.[contenthash:10].css",
  }),
  new OptimizeCssAssetsWebpackPlugin(),
  new htmlWebpackPlugin({
    filename: "index.html",
    template: "./public/index.html",
    minify: {
      //压缩html
      collapseWhitespace: true,
      removeComments: true,
    },
  }),
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true, //帮助service-worker快速启动
    skipWaiting: true, //删除旧的service-worker
    //生成service-workder.js
  }),
];
//入口文件
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("service注册成功了～");
      })
      .catch(() => {
        console.log("service注册失败了～");
      });
  });
}
```
