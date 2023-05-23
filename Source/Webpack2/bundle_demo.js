// var exports = {}
// (function (exports, code) {
// 	eval(code)
// })(exports, 'exports.default = function(a,b){return a + b}')

(function (list) {
  function require(file) {
    var exports = {};
    (function (exports, code) {
      eval(code);
    })(exports, list[file]);
    return exports;
  }
  require("index.js");
})({
  "index.js": `
    var add = require('add.js').default
    console.log(add(1 , 2))
    `,
  "add.js": `
    exports.default = function(a,b){return a + b}
    `,
});

// var add = require("add.js").default;
// console.log(add(1, 2));

// 分析依赖
// ES6转ES5
// 替换exports和require
