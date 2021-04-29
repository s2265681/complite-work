let path = require("path");
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "none",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new BundleAnalyzer({
      analyzerMode: "server",
      analyzerHost: "127.0.0.1",
      analyzerPort: "8888",
    }), // 默认配置
  ],
};
