let path = require("path");
let Plu = require('./plugin/Plu')

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool:'source-map',
  module:{
     rules:[{
        test: /\.(css|less)$/i, // 基于正则处理
        use:[
            path.resolve(__dirname,'loader','style-loader'),
            path.resolve(__dirname,'loader','less-loader'),
            // 'style-loader',
            // 'less-loader'
        ]
      },{
        test: /\.(js)$/i, // 基于正则处理
        use:[
            path.resolve(__dirname,'loader','babel-loader'),
        ]
      }]
  },
  plugins:[new Plu()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
