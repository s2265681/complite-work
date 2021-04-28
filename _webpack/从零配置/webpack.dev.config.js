const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let DEV_TYPE = process.env.DEV_TYPE;
console.log(DEV_TYPE, "DEV_TYPE...");
const isBuild = DEV_TYPE === "dev";

let config = isBuild
  ? {
      plugins: [
        // 动态链接库找不到去链接库去找
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "dist/dll", "manifest.json"),
        }),
        // 不要清理dll下面的文件
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ["!dll/**/*"],
        }),
      ],
      watch: true,
      watchOptions: {
        poll: 1000, // 每秒询问一下是不是更新
        aggregateTimeout: 500, // 防抖 一致输入代码  打包
        ignored: /node_modules/, // 忽略哪个文件不监控
      },
    }
  : {
      devServer: {
        port: "3000",
        open: true,
        hot: true,
        compress: true,
      },
      plugins: [new CleanWebpackPlugin()],
    };

console.log(config, "config...");
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      // 处理JS
      {
        test: /\.(jsx?)$/i,
        use: [
          // 开启语法检测
          //   "eslint-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  ...config,
};
