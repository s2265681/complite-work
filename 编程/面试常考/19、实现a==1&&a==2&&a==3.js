/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-02 07:08:34
 */

// 实现(a == 1 && a == 2 && a == 3)为true
// 原理 执行比较的时候 对象会调用内部的toString方法， 数组会调用内部的join方法, 还会调用defineProperty内的get方法
// 法一
var a = {
  i: 1,
  toString: function () {
    return a.i++;
  },
};
console.log(a == 1 && a == 2 && a == 3);

// 法二
var a = [1,2,3]
a.join = a.shift
console.log(a == 1 && a == 2 && a == 3);

// 法三
let val = 0 
Object.defineProperty(window, 'a', {
    get: function () {
        return ++val;
    }
});
console.log(a == 1 && a == 2 && a == 3);
