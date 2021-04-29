## 1. 什么是HMR
- Hot Module Replacement是指当你对代码修改并保存后，webpack将会对代码进行得新打包，并将新的模块发送到浏览器端，浏览器用新的模块替换掉旧的模块，以实现在不刷新浏览器的前提下更新页面。
- 相对于`live reload`刷新页面的方案，HMR的优点在于可以保存应用的状态,提高了开发效率

## 2. 搭建HMR项目
### 2.1 安装依赖的模块
```js
cnpm i webpack webpack-cli webpack-dev-server mime html-webpack-plugin express socket.io events -S
```

### 2.2 package.json
package.json
```json
{
  "name": "zhufeng_hmr",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "webpack": "4.39.1",
    "webpack-cli": "3.3.6",
    "webpack-dev-server": "3.7.2"
  }
}
```

### 2.2 webpack.config.js
webpack.config.js
```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode:'development',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.join(__dirname, 'dist')
	},
	devServer: {
		contentBase:path.join(__dirname, 'dist')
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			filename:'index.html'
		})
	]
}
```

### 2.3 src\index.js
src\index.js
```js
let root = document.getElementById('root');
function render(){
   let title = require('./title').default;
   root.innerHTML= title;
}
render();
```

### 2.4 src\title.js
src\title.js
```js
export default 'hello';
```

### 2.5 src\index.html
src\index.html
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack热更新</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

## 3.流程图
![webpackhmr.png](http://img.zhufengpeixun.cn/webpackhmr.png)

## 4.实现
### 4.1 webpack.config.js
```js
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### 4.2 index.js
src\index.js
```js
import '../webpackHotDevClient';
let root = document.getElementById("root");
function render() {
  let title = require("./title");
  root.innerHTML = title;
}
render();


if(module.hot){
  module.hot.accept(['./title'],()=>{
      render();
  });
}
```

### 4.2 src\title.js
src\title.js
```js
module.exports = 'title7';
```

### 4.3 src\index.html
src\index.html
```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack热更新</title>
</head>

<body>
    <div id="root"></div>
    <script src="/socket.io/socket.io.js"></script>
</body>

</html>
```

### 4.4 webpack-dev-server.js
webpack-dev-server.js
```js
const path = require("path");
const fs = require("fs");
const express = require("express");
const mime = require("mime");
const webpack = require("webpack");
let config = require("./webpack.config");
let compiler = webpack(config);
//1. 创建webpack实例
//2. 启动webpack-dev-server服务器
class Server {
  constructor(compiler) {
    //4. 添加webpack的`done`事件回调，在编译完成后会向浏览器发送消息
    let lastHash;
    let sockets = [];
    compiler.hooks.done.tap("webpack-dev-server", (stats) => {
      lastHash = stats.hash;
      sockets.forEach((socket) => {
        socket.emit("hash", stats.hash);
        socket.emit("ok");
      });
    });
    let app = new express();
    compiler.watch({}, (err) => {
      console.log("编译成功");
    });

    //3. 添加webpack-dev-middleware中间件
    const webpackDevMiddleware = (req, res, next) => {
      if (req.url === "/favicon.ico") {
        return res.sendStatus(404);
      }
      let filename = path.join(config.output.path, req.url.slice(1));
      try {
        let stats = fs.statSync(filename);
        if (stats.isFile()) {
          let content = fs.readFileSync(filename);
          res.header("Content-Type", mime.getType(filename));
          res.send(content);
        } else {
          next();
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
  //9. 创建http服务器并启动服务
  listen(port) {
    this.server.listen(port, () => {
      console.log(port + "服务启动成功!");
    });
  }
}
//3. 创建Server服务器
let server = new Server(compiler);
server.listen(8080);

```

### 4.5 webpackHotDevClient.js
webpackHotDevClient.js
```js
let socket = io("/");
let currentHash;
let hotCurrentHash;
const onConnected = () => {
  console.log("客户端已经连接");
  //6. 客户端会监听到此hash消息
  socket.on("hash", (hash) => {
    currentHash = hash;
  });
  //7. 客户端收到`ok`的消息
  socket.on("ok", () => {
    hotCheck();
  });
  socket.on("disconnect", () => {
     hotCurrentHash = currentHash = null;
  });
};
//8.执行hotCheck方法进行更新
function hotCheck() {
  if (!hotCurrentHash || hotCurrentHash === currentHash) {
    return (hotCurrentHash = currentHash);
  }
  //9.向 server 端发送 Ajax 请求，服务端返回一个hot-update.json文件，该文件包含了所有要更新的模块的 `hash` 值和chunk名
  hotDownloadManifest().then((update) => {
    let chunkIds = Object.keys(update.c);
    chunkIds.forEach((chunkId) => {
      //10. 通过JSONP请求获取到最新的模块代码
      hotDownloadUpdateChunk(chunkId);
    });
  });
}

function hotDownloadUpdateChunk(chunkId) {
  var script = document.createElement("script");
  script.charset = "utf-8";
  script.src = "/" + chunkId + "." + hotCurrentHash+ ".hot-update.js";
  document.head.appendChild(script);
}
function hotDownloadManifest() {
  var url = "/" + hotCurrentHash + ".hot-update.json";
  return fetch(url).then(res => res.json()).catch(error=>{console.log(error);});
}
//11. 补丁JS取回来后会调用`webpackHotUpdate`方法
window.webpackHotUpdate = (chunkId, moreModules) => {
  for (let moduleId in moreModules) {
    let oldModule = __webpack_require__.c[moduleId];//获取老模块
    let { parents, children } = oldModule;//父亲们 儿子们
    var module = (__webpack_require__.c[moduleId] = {
      i: moduleId,
      exports: {},
      parents,
      children,
      hot: window.hotCreateModule(),
    });
    moreModules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    parents.forEach((parent) => {
      let parentModule = __webpack_require__.c[parent];
      parentModule.hot &&
        parentModule.hot._acceptedDependencies[moduleId] &&
        parentModule.hot._acceptedDependencies[moduleId]();
    });
    hotCurrentHash = currentHash;
  }
};
socket.on("connect", onConnected);
window.hotCreateModule = () => {
  var hot = {
    _acceptedDependencies: {}, //接收的依赖
    _acceptedDependencies: function (dep, callback) {
      for (var i = 0; i < dep.length; i++) {
        hot._acceptedDependencies[dep[i]] = callback;
      }
    },
  };
  return hot;
}
```