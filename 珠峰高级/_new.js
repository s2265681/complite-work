

/**
 * 1、实现一个new运算符
 */

/*
function _new(Fn, ...args) {
 // 创建一个对象，指向函数的原型
 let obj = {};
 obj.__proto__ = Fn.prototype;
 // 执行函数，改变this指向
 let result = Fn.call(obj, ...args)
 // 分析返回结果的返回值，如果不是空，或者返回的是函数或者对象，返回result，否则返回对象
 if (result !== null && /^('object|function')$/.test(typeof result)) {
   return result
 }
 return obj
}

function Fn(a, b) {
 this.a = a;
 this.b = b
}
// let n = new Fn(1, 2)
let n = _new(Fn, 1, 2)
console.log(n)  // name {a:1,b:2}
*/

/**
 * 2、A函数和B函数，继承的操作
 */
// 方法一： 
// function A(age) {
//   this.age = age;
//   var go = "haha"
// }
// A.prototype.name = "我是A"
// A.fun = "fun"

// function B() {

// }
// B.prototype = new A()  // 继承实例对象
// B.prototype = A.__proto__;
// console.log(B)
// console.log(A)

/**
 * 3、实现一个instanceOf
 */

// -function () {
//   function myInstanceof(...args) {
//     if (typeof this === undefined) {
//       return args[1].name === Object.prototype.toString.call(args[0]).slice(8).slice(0, -1)
//     }
//     return args[0].name === Object.prototype.toString.call(this).slice(8).slice(0, -1)
//   }
//   Object.prototype.myInstanceof = myInstanceof
// }()

// let arr = 12
// let res1 = arr.myInstanceof(Number)
// let res2 = myInstanceof(arr, Number)
// console.log(res1)
// console.log(res2)

/**
* 4、实现一个typeof
*/

// +function () {
//   function myTypeof(type) {
//     if (typeof this === undefined) {
//       return Object.prototype.toString.call(this).slice(8).slice(0, -1).toLocaleLowerCase()
//     }
//     return Object.prototype.toString.call(12).slice(8).slice(0, -1).toLocaleLowerCase()
//   }
//   Object.prototype.myTypeof = myTypeof
// }()
// let a = 124;
// console.log(a.myTypeof())
// console.log(myTypeof(a))

/**
* 5、实现一个call、apply、bind
*/



