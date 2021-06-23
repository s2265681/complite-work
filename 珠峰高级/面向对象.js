function Fn() {
}
Fn.prototype.XX = function () { }
// 类原型的重定向：没有constructor，原始的原型对象上的属性方法将不能再使用，然后释放
// 解决方式，1、手动添加
// Fn.prototype = {
//   constructor: Fn,
//   A: function () { },
//   B: function () { },
// }
// 2、合并,新的对象合并旧的原型对象，但是可能新值替换老值
// Fn.prototype = Object.assign(Fn.prototype, {
//   constructor: Fn,
//   A: function () { },
//   B: function () { },
// })

// 3、 重构原型指向，把老的原型对象作为新原型对象的上级原型
let newProto = new Object(Fn.prototype)  // 重构原型链指向
Fn.prototype = Object.assign(newProto, {
  constructor: Fn,
  A: function () { },
  B: function () { },
})

// 4、内置类原型无法重定向

let f = new Fn
console.log(f)


// 继承
// call 原型 寄生组合 class


