/**
 * 1、
 * @params executor:function(resolve,reject)=>{}
 * 检验函数参数executor函数，
 * 传递两个参数（两个回调方法），
 * 实例状态属性，状态只能改变一次
 * resolve成功 =>  fulfilled , reject 和 executor函数执行错误 => rejected
 * 测试：
 * keys 1、new MyPromise() 报错
 * keys 2、executor执行错误结果为错误
 * keys 3、resolve执行结果返回成功，reject执行结果返回失败
 * keys 4、实例this上挂载来PromiseValue和promoseStatus
 */
// function MyPromise(executor){
//     if(typeof executor !== 'function'){
//         throw TypeError(`${executor} is not a function`)
//     }
//     this.PromiseValue = null;
//     this.promoseStatus = 'pedding';
//     var _this = this;
//     function change(status,value){
//         if(_this.promoseStatus!=='pedding')return;
//         _this.PromiseValue = value;
//         _this.promoseStatus = status;
//     }
//     try {
//         executor((value)=>change('fulilled',value),(reason)=>change('rejected',reason))
//     } catch (error) {
//         change('rejected',error)
//     }
// }
// 通过

/**
 * 第二步：
 * .then
 * .catch
 * Promise.resolve
 * Promise.reject
 * 测试
 * keys 1: 可以通过.then获取到结果PromiseValue值
 * keys 2: 通过.catch获取到rejected的值
 * keys 3: 通过Promise.resolve 获取直接获取成功的new实例
 * keys 4: 通过Promise.reject 获取直接获取失败的new实例
 */

function MyPromise(executor) {
  if (typeof executor !== "function") {
    throw TypeError(`${executor} is not a function`);
  }
  this.PromiseValue = null;
  this.promoseStatus = "pedding";
  function change(status, value) {
    if (this.promoseStatus !== "pedding") return;
    this.PromiseValue = value;
    this.promoseStatus = status;
    var timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      if(typeof this.resolveFunc === "function")this.resolveFunc(value);
      if(typeof this.rejectFunc === "function")this.rejectFunc(value);
    });
  }
  try {
    executor(
      (value) => change.call(this, "fulilled", value),
      (reason) => change.call(this, "rejected", reason)
    );
  } catch (error) {
    change.call(this,"rejected", error);
  }
}

MyPromise.prototype.then = function (resolveFunc, rejectFunc) {
  // 实现链式调用的关键在这里， 如果不传参数还需哟判断如果不报错，自动补全 new resolve
  this.resolveFunc = resolveFunc;
  this.rejectFunc = rejectFunc;

};

MyPromise.resolve = function(value){
    return new MyPromise(resolve=>resolve(value))
}

MyPromise.reject = function(reason){
    return new MyPromise((_,reject)=>reject(reason))
}
// MyPromise.prototype.catch = this.then(null,rejectFunc)

let p = new MyPromise((resolve,reject)=>{
    reject(2)
})
let p1 = MyPromise.reject(2)
console.log(p)
console.log(p1)
// let p11 = p1.catch()
console.log(p11)