# webpack

### 介绍

- [链接](https://webpack.js.org/configuration/mode/)
  a bundler for javascript and friends

---

![webpack](https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3483345719,214526697&fm=26&gp=0.jpg)

### 简单配置使用技巧

### loader 机制

真正解决了 html 中文件的引入，实现了万物皆模块，实现 javascript 驱动

### plugin 插件机制

常见应用场景

- 打包前清楚 dist 目录（clean-webpack-plugin）
- 生成所需要的 HTML 文件 （html-webpack-plugin）
- 根据环境动态注入变化的部分(如 API 地址等)
- 拷贝不需要打包的资源文件到输出目录
- 压缩 Webpack 打包后输出的文件
- 自动发布打包结果到服务器实现自动部署
