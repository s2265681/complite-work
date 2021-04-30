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
