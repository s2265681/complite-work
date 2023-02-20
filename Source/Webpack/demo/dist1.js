var __webpack_modules__ = {
  "./src/age.js": (module) => {
    module.exports = "不要秃头啊1";
  },

  "./src/name.js": (module) => {
    module.exports = "不要秃头啊";
  },
};
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  // read cache
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  // white cache
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  console.log(__webpack_module_cache__);
  return module.exports;
}

const name = __webpack_require__("./src/name.js");
const age = __webpack_require__("./src/age.js");
console.log("entry文件打印作者信息", name, age);
