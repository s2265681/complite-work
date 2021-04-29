(() => {
    var __webpack_modules__ = {
      
      "./src/index.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`const str = __webpack_require__("./src/a.js");

const c = __webpack_require__("./src/c.js");

__webpack_require__("./src/index.less");

console.log(str, c);

class ZF {
  constructor() {
    this.name = 'sssss';
  }

  getName() {
    return this.name;
  }

}

let zf = new ZF();
console.log(zf.getName());`) },
      
      "./src/a.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`let b = __webpack_require__("./src/base/b.js");

module.exports = 'a' + b;`) },
      
      "./src/base/b.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`module.exports = 'b';`) },
      
      "./src/c.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`module.exports = 'c';`) },
      
      "./src/index.less": (module, __unused_webpack_exports, __webpack_require__) => {eval(`let style = document.createElement('style');
style.innerHTML = "body div {\\n;  color: #f00;\\n;  background-color: orange;\\n;  height: 200px;\\n;  width: 100px;\\n;}\\n;";
document.head.appendChild(style);`) },
      
    };
    function __webpack_require__(moduleId) {
      var module = {}
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      return module.exports;
    }
    __webpack_require__("./src/index.js");
  })();
  