const path = require("path");
const fs = require("fs");
const express = require("express");
const mime = require("mime");
let config = require("./webpack.config");
class Server {
  constructor(compiler) {
    let lastHash;
    let sockets = [];
    // 注册webpack done事件回调， 拿到值发给浏览器展示
    compiler.hooks.done.tap("webpack-dev-server", (stats) => {
      lastHash = stats.hash;
      sockets.forEach((socket) => {
        socket.emit("hash", stats.hash);
        socket.emit("ok");
      });
    });

    // 启动服务监听
    let app = new express();
    // 基础就是基于compiler的监听 感知代码的change
    compiler.watch({}, (err) => {
      console.log("编译成功");
    });
    //3. 添加webpack-dev-middleware中间件
    const webpackDevMiddleware = (req, res, next) => {
      if (req.url === "/favicon.ico") {
        return res.sendStatus(404);
      }
      // /Users/rockshang/Desktop/complite-work/_webpack/hot/dist/index.html
      let filename = path.join(config.output.path, req.url.slice(1));
      try {
        let stats = fs.statSync(filename);
        if (stats.isFile()) {
          let content = fs.readFileSync(filename);
          res.header("Content-Type", mime.getType(filename));
          res.send(content);
        } else {
          return res.sendStatus(404);
        }
      } catch (error) {
        return res.sendStatus(404);
      }
    };
    app.use(webpackDevMiddleware);
    this.server = require("http").createServer(app);
    //4. 使用sockjs在浏览器端和服务端之间建立一个 websocket 长连接
    //将 webpack 编译打包的各个阶段的状态信息告知浏览器端,浏览器端根据这些`socket`消息进行不同的操作
    //当然服务端传递的最主要信息还是新模块的`hash`值，后面的步骤根据这一`hash`值来进行模块热替换
    let io = require("socket.io")(this.server);
    io.on("connection", (socket) => {
      sockets.push(socket);
      if (lastHash) {
        //5.发送hash值
        socket.emit("hash", lastHash);
        socket.emit("ok");
      }
    });
  }
  listen(port) {
    this.server.listen(port, () => {
      console.log(port + "服务启动成功!");
    });
  }
}

module.exports = Server;
