const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const RemoveCommentsPlugin = require("./my/remove-comments-plugin");
const webpack = require("webpack");
/**
 * @type { import('webpack').Configuration}
 */

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  // entry: "./index.js",
  entry: {
    index: "./page/js/index.js",
    about: "./page/js/about.js",
  },
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    hotOnly: false,
  },
  module: {
    rules: [
      {
        test: /\.js|jsx|tsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options:{
        // presets:[[
        //     '@babel/preset-env',{
        //         targets:{
        //           chrome:'67',
        //          },
        //         useBuiltIns:'usage'
        //     },
        //     "@babel/preset-react"
        //   ]]
        // "plugins": [["@babel/plugin-transform-runtime",{
        //   "corejs":2,
        //   "helpers":true,
        //   "regenerator":true,
        //   "useESModulrs":false
        //  }]]
        // }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              browsers: [
                "last 10 Chrome versions",
                "last 5 Firefox versions",
                "Safari >= 6",
                "ie> 8",
              ],
            },
          }
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use:{
          loader:"file-loader",
          options:{
            name:'[name]_[hash].[ext]',
            outputPath:'/dist/images/',
            limit:10240,
          }
        }
      },
      {
        test: /\.md$/,
        use: "./my/markdown-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, "markdown"), to: "markdown" },
        { from: path.join(__dirname, "page/image"), to: "image" },
      ],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "page/index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "page/about.html",
      inject: false,
    }),
    new RemoveCommentsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  }
};
