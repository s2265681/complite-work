const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const px2rem2LoaderPath = path.resolve(__dirname, "loaders/px2rem2-loader.js");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolveLoader: {
    //   alias:{
    //       'px2rem2-loader': px2rem2LoaderPath
    //   },
    modules: ["loaders", "node_modules"], // 找loaders文件夹 没有在找node_module  三种方式引用
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            //  babel-core @babel/preset-env @babel/preset-react
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env", //=> ES6 转成 ES5
                "@babel/preset-react", //=> 支持 React
              ],
            },
          },
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            // loader: "px2rem-loader", // 这种找不到 要设置 resolveLoader 的别名
            loader: px2rem2LoaderPath, // 可以直接放一个绝对路径
            options: {
              // 1rem 设计为设计稿 / 10
              remUnit: 75,
              remPrecision: 8, // 8位小数
              exclude: /antd.css/  
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};

// 750px    =》  375
// 图片宽75px  =》  37.5
