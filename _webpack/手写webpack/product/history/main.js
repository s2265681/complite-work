(() => {
  var __webpack_modules__ = {
    "./src/a.js": (module, __unused_webpack_exports, __webpack_require__) => {
      eval(
        "\nlet b = __webpack_require__(/*! ./base/b */ \"./src/base/b.js\")\nmodule.exports = 'a' + b\n\n//# sourceURL=webpack:///./src/a.js?"
      );
    },

    "./src/base/b.js": (module) => {
      eval(
        "\n\nmodule.exports = 'b'\n\n//# sourceURL=webpack:///./src/base/b.js?"
      );
    },
    "./src/index.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'const str = __webpack_require__(/*! ./a.js */ "./src/a.js")\nconsole.log(str)\n\n//# sourceURL=webpack:///./src/index.js?'
      );
    },
  };

  // __webpack_require__ 方法递归执行， 从入口index.js 开始 ， 通过moduleId找到 对应的函数， 传入三个参数
  //   __unused_webpack_module,
  //   ， __unused_webpack_exports,
  //   __webpack_require__

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
