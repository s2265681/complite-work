// 闭包
// 当函数可以记住 定义的词法作用域和执行的词法作用域 不是同一个，就会产生闭包
function a() {
  // b 函数 不在当前 a 这个词法作用域 中执行 ， 此时就会产生闭包
  let c = ""; // 只要记住这个词法作用域  就是闭包
  function b() {
    c++;
    console.log(c);
  }
  return b;
}

let c = a();
console.log(c());
console.log(c());
console.log(c());

const _ = require("lodash");

let newFn = _.after(2, function () {
  console.log("render fn", arguments);
});

newFn(1, 1);
newFn(2, 2);
newFn(3, 3);

function myAfter(count, callback) {
  if (typeof callback != "function") {
    throw new TypeError("Expected a function");
  }
  count = Number(count);
  return function () {
    if (--count < 1) {
      return callback.apply(this, arguments);
    }
  };
}

let newFn2 = myAfter(2, function () {
  console.log("render newFn2", arguments);
});

newFn2(1, 1);
newFn2(2, 2);
newFn2(3, 3);
