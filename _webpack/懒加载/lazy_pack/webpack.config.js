let path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool:'source-map',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization:{
      splitChunks:{
          cacheGroups:{
              vendor:{
                  chunks:'initial',  // 指定分割类型， 3种类型 all 、 async 异步(默认)、initial 同步
                  name: 'vendors', // 给分割出去的代码块起一个名字叫vendors
                  test:/node_modules/, // 如果模块路径匹配这个正则的话，就会添加一个vendors代码块
                  pririty: -10 // 优先级
              },
              commons:{
                  chunks:'initial',
                  name:'commons',
                  minSize:0,  // 最小提取字节 大于多少才用提取
                  minChunks:1,  //最少被几个chunk引用提取
                  
              }
          }
      }
  }
};
