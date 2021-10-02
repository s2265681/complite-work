// 原型链的特点
// 1、原型链的向上查找
// 实战 简述原理 实现一个instance函数
// 思路：遍历A的原型链，如果找到B.prototype返回true，否则为false

const instance = (A, B) => {
  let p = A;
  while (p) {
    if (p === B.prototype) {
      return true;
    }
    p = p.__proto__;
  }
  return false;
};

instance([], Array);

var foo = {},
  F = function () {};
Object.prototype.a = "value a";
Object.prototype.b = "value b";

console.log(foo.a, F.b, F.a); // value a value b value a
console.log(foo.a === F.a); // true
