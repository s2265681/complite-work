(() => {
    var installedModules = []
    var installedChunks = {
        main: 0
    }
    var __webpack_modules__ = {
      
      "./src/index.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`const str = __webpack_require__("./src/a.js");

const c = __webpack_require__("./src/c.js");

__webpack_require__("./src/index.less");

console.log(str, c); // class ZF{
//     constructor(){
//         this.name = 'sssss'
//     }
//     getName(){
//         return this.name
//     }
// }
// let zf = new ZF()
// console.log(zf.getName())

let button = document.createElement("button");
button.innerHTML = "按钮";
button.addEventListener("click", function () {
  // debugger
  __webpack_require__.e("src_hello_js.js").then(__webpack_require__.t.bind(__webpack_require__, "./src/hello.js")).then(result => {
    //   debugger
    console.log(result.default);
  });
});
console.log("index");
document.body.appendChild(button);`) },
      
      "./src/a.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`let b = __webpack_require__("./src/base/b.js");

module.exports = 'a' + b;`) },
      
      "./src/base/b.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`module.exports = 'b';`) },
      
      "./src/c.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`module.exports = 'c';`) },
      
      "./src/index.less": (module, __unused_webpack_exports, __webpack_require__) => {eval(`let style = document.createElement('style');
style.innerHTML = "body div {\\n;  color: #f00;\\n;  background-color: orange;\\n;  height: 200px;\\n;  width: 100px;\\n;}\\n;";
document.head.appendChild(style);`) },
      
    };
    function __webpack_require__(moduleId) {
      if(installedModules[moduleId]) {
          return installedModules[moduleId].exports;
      }
      var module = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
      }
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      return module.exports;
    }
    __webpack_require__.o = (obj, chunkId) => obj.hasOwnProperty(chunkId);

    __webpack_require__.e = function(chunkId){
        var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;
        if(installedChunkData !== 0) {
            return new Promise((resolve,reject)=>{
                installedChunks[chunkId] = resolve
                let script = document.createElement('script')
                script.src = chunkId;
                document.body.appendChild(script)
             })
        }else{
            return new Promise(res=> {
                 res()
                installedChunks[chunkId] = 0;
            })
        }
    }
    __webpack_require__.t = function(value){
        value = __webpack_require__(value)
        return {
            default: value
        }
    }
    window.webpackJsonp = (chunkId,moreModules) => {
        for(moduleId in moreModules) {
            __webpack_modules__[moduleId] = moreModules[moduleId]
            installedChunks[chunkId]()
            installedChunks[chunkId] = 0
        }
    }
    __webpack_require__("./src/index.js");
  })();
  