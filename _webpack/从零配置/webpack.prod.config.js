const { CleanWebpackPlugin }= require('clean-webpack-plugin')
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');


/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
  module: {
    // 模块规则，使用加载器，从右向左执行，从下向上执行
    rules: [
      // 处理JS
      {
        test: /\.(jsx?)$/i,
        use: [
          // 开启语法检测
        //   "eslint-loader",
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // 不要清理dll下面的文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["!dll/**/*"],
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略这个包
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      hash: true,
      minify: {
        // collapseWhitespace: true, // 去除空格
        removeComments: true, // 去掉注释
        removeAttributeQuotes: true, // 去除属性的双引号
        removeEmptyAttributes: true, // 去除空属性
        // removeEmptyElements: true, // 去除空的元素
      },
    }),
    new webpack.ProgressPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
