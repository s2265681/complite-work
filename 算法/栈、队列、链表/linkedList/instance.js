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
console.log("11");
