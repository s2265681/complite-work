(() => {
    var __webpack_modules__ = {
      
      "./src/index.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`const str = __webpack_require__("./src/a.js");

console.log(str);`) },
      
      "./src/a.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`let b = __webpack_require__("./src/base/b.js");

module.exports = 'a' + b;`) },
      
      "./src/base/b.js": (module, __unused_webpack_exports, __webpack_require__) => {eval(`module.exports = 'b';`) },
      
    };
    function __webpack_require__(moduleId) {
      var __webpackM = __webpack_modules__[moduleId];
      var module = (__webpackM[moduleId] = {
        exports: {},
      });
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      return module.exports;
    }
    __webpack_require__("./src/index.js");
  })();
  