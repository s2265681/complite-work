const path = require("path");
const webpack = require("webpack");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const smw = new SpeedMeasureWebpackPlugin();
const bootstrap = path.resolve(
  __dirname,
  "node_modules/bootstrap/dist/css/bootstrap.css"
);
//module.exports = smw.wrap({
module.exports = {
  mode: "development", //开发模式
  devtool: false, //不生成 sourcemap
  entry: "./src/index.js", //入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
    alias: {
      bootstrap: bootstrap,
    },
    modules: [path.resolve(__dirname, "node_modules")],
    // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
    mainFields: ["browser", "module", "main"],
    mainFiles: ["index"], // 你可以添加其他默认使用的文件名
  },
  resolveLoader: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"],
  },
  module: {
    noParse: /jquery|lodash/, // 正则表达式
    // 或者使用函数
    /* noParse(content) {
      return /jquery|lodash/.test(content);
    }, */
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: "thread-loader",
                options: {
                  workers: 3,
                },
              },
              "cache-loader",//启动缓存loader
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                  cacheDirectory: true,//缓存目录
                },
              },
            ],
            include: path.join(__dirname, "src"),
            exclude: /node_modules/,
          },
        ],
      },
    ],
  },
  stats: "normal",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
    }),
    new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
    new FriendlyErrorsWebpackPlugin(),
    new DllReferencePlugin({
      manifest: require("./dist/react.manifest.json"),
    }),
    new HardSourceWebpackPlugin(),
  ],
  devServer: {},
};
