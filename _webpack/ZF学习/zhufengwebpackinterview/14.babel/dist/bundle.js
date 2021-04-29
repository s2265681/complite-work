
(function (modules) {
    function __webpack_require__(moduleId) {
        var module = {
            i: moduleId,
            exports: {}
        };
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );
        return module.exports;
    }

    return __webpack_require__("./src/index.js");
})(
    {
      "./src/title.js": function (module, exports,__webpack_require__) {module.exports = 'title';},"./src/index.js": function (module, exports,__webpack_require__) {let title = __webpack_require__("./src/title.js");

console.log(title);}
    }
);
