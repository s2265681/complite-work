var exports = {};

exports.default = function (a, b) {
  return a + b;
};

// var add = require("./add.js").default;

var exports = {};

console.log(exports, "exports");
console.log(exports.default(1, 2));

function require(file) {
  var exports = {}(function (exports, code) {
    eval(code);
  })(exports, "exports.default = function (a, b) {return a + b;};");
}
