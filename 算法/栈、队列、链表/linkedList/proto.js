const obj = {};

const func = () => {};

Object.prototype.x = "x";

const arr = [];

// 原型链相关知识点

// 如果A沿着原型链找到B.prototype 那么A instance B 为 true
// 如果A对象上没有找到x属性，那么会沿着原型链找x属性

// 实战 简述原理 实现一个instance函数
// 思路：遍历A的原型链，如果找到B.prototype返回true，否则为false

const instance = (A, B) =>{
  let p = A;
  while (p) {
    if (p === B.prototype) {
      return true;
    }
    p = p.__proto__;
  }
  return false;
}

instance([], Array);
console.log('11')
