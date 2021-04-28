const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "bundle.[hash:8].min.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    //   exclude: [path.resolve(__dirname,"node_moudles")],
    // modules: [path.resolve(__dirname,"node_moudles")],
    // 扩展名  此时在引入可以不加后缀名
    extensions: [".js", ".css", ".vue"],
    // mainFiels:['style','main'],
    // mainFiles:[], // 入口文件的名字 index.js
    alias: {
      // 别名 vue ...
      //   bootstrap: "bootstrap/dist/css/bootstrap.css",
    },
  },
  module: {
    // 模块规则，使用加载器，从右向左执行，从下向上执行
    rules: [
      // 处理CSS
      {
        test: /\.(css|less)$/i, // 基于正则处理
        use: [
          // 'style-loader', // css插入到HEAD中
          MiniCssExtractPlugin.loader, // 处理less的文件 使用插件的loader，抽离css
          "css-loader", // 编译解析@import/URL这种语法
          "postcss-loader", // 设置前缀，兼容css3写法
          {
            loader: "less-loader",
            options: {
              // 加载器额外配置
            },
          },
        ],
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|ico|bmp|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1 * 1024, // 小于200kb处理成BASE64
              outputPath: "./images", // 图片编译后都放在统一的images文件下
              name: "[name].[hash].[ext]",
              esModule: false,
            },
          },
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: ["html-withimg-loader"],
      },
      // 处理JS
      {
        test: /\.(jsx?)$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    legacy: true,
                  },
                ],
                [
                  "@babel/plugin-proposal-class-properties",
                  {
                    loose: true,
                  },
                ],
                "@babel/plugin-transform-runtime",
              ],
            },
          },
          // 开启语法检测
          //   "eslint-loader",
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略这个包
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      hash: true,
    }),
    new webpack.ProgressPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
