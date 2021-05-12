let socket = io("/");
let currentHash;
let hotCurrentHash; // lastHash 上一次的hash值
class Emitter {
  constructor() {
    this.listeners = {};
  }
  on(type, listener) {
    this.listeners[type] = listener;
  }
  emit(type) {
    this.listeners[type] && this.listeners[type]();
  }
}
let hotEmitter = new Emitter();

socket.on("connect", () => {
  console.log("客户端连接成功");
});

socket.on("hash", (hash) => {
  currentHash = hash;
});

socket.on("ok", () => {
  debugger;
  reloadApp(true);
});

hotEmitter.on("webpackHotUpdate", function () {
  if (!hotCurrentHash || hotCurrentHash == currentHash) {
    return (hotCurrentHash = currentHash);
  }
  hotCheck();
});

function reloadApp(hot) {
  if (hot) {
    // 如果为true，热更新
    hotEmitter.emit("webpackHotUpdate");
  } else {
    // 不支持热更新  直接加载
    window.location.reload();
  }
}

//8.执行hotCheck方法进行更新
function hotCheck() {
  // 询问服务器 这次编译相对于上一次编译 改变了哪些
  hotDownloadManifest().then((update) => {
    let chunkIds = Object.keys(update.c);
    chunkIds.forEach((chunkId) => {
      //10. 通过JSONP请求获取到最新的模块代码块
      hotDownloadUpdateChunk(chunkId);
    });
  });
}

// 拿到变化的文件
function hotDownloadManifest() {
  return new Promise(function (resolve) {
    let request = new XMLHttpRequest();
    let requestPath = "/" + hotCurrentHash + ".hot-update.json";
    request.open("GET", requestPath, true);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        let update = JSON.parse(request.responseText);
        resolve(update);
      }
    };
    request.send();
  });
}

function hotDownloadUpdateChunk(chunkId) {
  var script = document.createElement("script");
  script.charset = "utf-8";
  // /main.xxx.hot-update.js
  script.src = "/" + chunkId + "." + hotCurrentHash + ".hot-update.js";
  document.head.appendChild(script);
}
//11. 补丁JS取回来后会调用`webpackHotUpdate`方法
window.webpackHotUpdate = (chunkId, moreModules) => {
  for (let moduleId in moreModules) {
    let oldModule = __webpack_require__.c[moduleId]; //获取老模块
    let { parents, children } = oldModule; //父亲们 儿子们
    var module = (__webpack_require__.c[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
      parents,
      children,
      hot: window.hotCreateModule(),
    });
    // 更新为最新
    moreModules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    module.l = true;

    parents.forEach((parent) => {
      let parentModule = __webpack_require__.c[parent];
      parentModule.hot &&
        parentModule.hot._acceptedDependencies[moduleId] &&
        parentModule.hot._acceptedDependencies[moduleId]();
    });
    hotCurrentHash = currentHash;
  }
};

window.hotCreateModule = () => {
  var hot = {
    _acceptedDependencies: {}, //接收的依赖
    accept: function (dep, callback) {
      for (var i = 0; i < dep.length; i++) {
        hot._acceptedDependencies[dep[i]] = callback;
      }
    },
  };
  return hot;
};
