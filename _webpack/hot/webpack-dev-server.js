
const webpack = require("webpack");
let config = require("./webpack.config");
let Server = require('./server.js')
//1. 创建webpack实例
let compiler = webpack(config);
//2. 启动webpack-dev-server服务器
//3. 创建Server服务器
let server = new Server(compiler);
server.listen(8000);