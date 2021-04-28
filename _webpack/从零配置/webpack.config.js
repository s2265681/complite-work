const { merge } = require("webpack-merge");
let base = require("./webpack.base.js");
let prod = require("./webpack.prod.config.js");
let dev = require("./webpack.dev.config.js");
let isProduction =  process.env.NODE_ENV === 'production';
let config = isProduction ? prod : dev;

module.exports = merge(base, {
  mode: isProduction? "production": 'development',
  ...config,
});
