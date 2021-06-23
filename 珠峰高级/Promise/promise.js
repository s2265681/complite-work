// 第一步： 校验参数、描述类的私有属性、状态更改后不可再变
function MyPromise(executor) {
  if (typeof executor !== 'function') {
    throw TypeError(`TypeError: Promise resolver ${executor} is not a function`)
  }
  this.PromiseValue = null;
  this.PromiseStatus = 'pending';
  // + ===========
  this.resolveFunc = Function.prototype;
  this.rejectFunc = Function.prototype;
  // =============
  _this = this;
  function change(status, value) {
    if (_this.PromiseStatus !== 'pending') return
    _this.PromiseStatus = status;
    _this.PromiseValue = value;
    // + ===========
    let timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      console.log(_this, 'this')
      _this.PromiseStatus === "fulfilled" ? _this.resolveFunc.call(_this, value) : _this.rejectFunc.call(_this, value);
    })
    // ===========
  }
  executor((value) => change("fulfilled", value), (reason) => change("rejected", reason));
}
// + ======
MyPromise.prototype.then = function (res, rej) {
  this.resolveFunc = res
  this.rejectFunc = rej
}
// ======

// let p = new MyPromise((resolve, reject) => {
//   resolve(1)
//   reject(1)
// })
// p.then(value => {
//   console.log(value, 'value')
// }, reason => {
//   console.log(reason, 'reason')
// })
// console.log(p, 'p')
let p1 = new MyPromise(resolve => {
  return setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new MyPromise(resolve => {
  return setTimeout(function () {
    resolve(2)
  }, 3000)
})
let p3 = new MyPromise(resolve => {
  return setTimeout(function () {
    resolve(3)
  }, 6000)
})
p1.then(res => {
  console.log(res)
})
p2.then(res => {
  console.log(res)
})
p3.then(res => {
  console.log(res)
})