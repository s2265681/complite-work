let path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module:{
     rules:[{
        test: /\.(css|less)$/i, // 基于正则处理
        use:[
           "style-loader",   // css插入到HEAD中,内嵌式加入
           "css-loader",     // 编译解析@import/URL这种语法
           "less-loader"
        ]
      }]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
