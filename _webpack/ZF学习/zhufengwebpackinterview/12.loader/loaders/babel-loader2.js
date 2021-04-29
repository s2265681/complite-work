const babel = require("@babel/core");
function loader(source, inputSourceMap, data) {
  //C:\webpack-analysis2\loaders\babel-loader.js!C:\webpack-analysis2\src\index.js
  const options = {
    presets: ["@babel/preset-env"],
    inputSourceMap: inputSourceMap,
    sourceMaps: true, //ourceMaps: true 是告诉 babel 要生成 sourcemap
    filename: this.request.split("!")[1].split("/").pop(),
  };
  //在webpack.config.js中 增加devtool: 'eval-source-map'
  let { code, map, ast } = babel.transform(source, options);
  //return code;
  return this.callback(null, code, map, ast);
}
module.exports = loader;
