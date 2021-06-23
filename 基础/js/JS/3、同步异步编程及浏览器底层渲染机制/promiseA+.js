/**
 * promise
 * - 实例promise all、 race 、 finall
 * - 原型链上 then 、 catch
 */
function MyPromise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("Promise resolver " + executor + " is not a function");
  }
  // 设置实例的私有属性
  var _this = this;
  this.PromiseStatus = "pending";
  this.PromiseValue = undefined;
  this.resolveFunc = Function.prototype;
  this.rejectFunc = Function.prototype;
//   this.rejectFunc = function () {};

  // 修改实例的status和value, 只有当前状态为'pending'的时候才可以修改状态，一旦成功或者失败后就不能在修改状态了
  function change(status, value) {
    if (_this.PromiseStatus !== "pending") return;
    _this.PromiseStatus = status;
    _this.PromiseValue = value;

    // 通知基.then注入某个方法执行(异步模拟微任务)
    var delayTimer = setTimeout(function () {
      clearTimeout(delayTimer);
      delayTimer = null;
      // 目的 通过.then 异步的通知方法执行
      var status = _this.PromiseStatus,
        value = _this.PromiseValue;
      //  if(status === "fulfilled"){
      //      if(typeof )
      //  }
      status === "fulfilled"
        ? _this.resolveFunc.call(_this, value)
        : _this.rejectFunc.call(_this, value);
    }, 0);
  }

  // 设定传递给executor并且执行可以修改实例状态和value的resolve/reject函数
  function resolve(value) {
    change("fulfilled", value);
  }
  function reject(reason) {
    change("rejected", reason);
  }
  // new MyPromise的时候，会立即把executor执行
  // executor函数执行出错也会把实例的状态改为失败，且value是失败的原因
  try {
    executor(resolve, reject);
  } catch (err) {
    change("rejected", err.message);
  }
}
MyPromise.prototype.then = function (resolveFunc, rejectFunc) {
  // 参数不传默认值的处理,实现效果是顺延
  if (typeof resolveFunc !== "function") {
      resolveFunc = function (value) {
      return MyPromise.resolve(value);
    };
  }
  if (typeof rejectFunc !== "function") {
       rejectFunc = function (reason) {
      return MyPromise.reject(reason);
    };
  }
  var _this = this;
  // this.resolveFunc = resolveFunc;
  // this.rejectFunc =rejectFunc;

  // 返回一个新的promise实例，
  // 成功失败取决于resolveFunc/rejectFunc执行是否报错或者
  // 返回值是否为新的myPromise实例
  return new MyPromise(function (resolve, reject) {
    _this.resolveFunc = function (value) {
      // this -> 实例
      // 函数包一下在执行，目的是知道函数执行是否报错，返回结果
      try {
        var x = resolveFunc(value);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
      } catch (err) {
        reject(err.message);
      }
    };
    _this.rejectFunc = function (reason) {
      try {
        var x = rejectFunc(reason);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
      } catch (err) {
        reject(err.message);
      }
    };
  });
};
MyPromise.prototype.catch = function (rejectFunc) {
  return this.then(null, rejectFunc);
};

MyPromise.resolve = function (value) {
  return new MyPromise(function (resolve) {
    resolve(value);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise(function (_, reject) {
    reject(reason);
  });
};

MyPromise.all = function (promiseArr) {
  return new MyPromise(function (resolve, reject) {
      var index = 0,
        values = [];
      for (var i = 0; i < promiseArr.length; i++) {
        // 利用闭包的方式保存循环每一项的索引
        (function (i) {
          var item = promiseArr[i];
          // 如果不是Promise实例,直接算作当前项成功
          !(item instanceof MyPromise)
            ? (item = MyPromise.resolve(item))
            : null;
          // 如果是Promise实例
          if (item instanceof MyPromise) {
            item
              .then(function (value) {
                index++;
                values[i] = value;
                if (index >= promiseArr.length) {
                  // 整体成功
                  resolve(values);
                }
              })
              .catch(function (reason) {
                // 只要有一个失败，整体就失败
                reject(reason);
              });
            return;
          }
        })(i);
      }
    });
};

// 测试
// 调用then 和 catch
// var p1 = new MyPromise(function (resolve, reject) {
// //   resolve(10);
//   reject(20);
// });
// var p2 = p1.then(
//   function (value) {
//     console.log("OK", value);
//     // return 100;
//     return MyPromise.reject(20);
//   },
// //   function (reason) {
// //     console.log("NO", reason);
// //   }
// )
// .then(function(value){
//     console.log("OK", value)
// },function(reason){
//     console.log("NO", reason)
// })
// console.log(p1);
// console.log(p2); // p2 也要是一个promise

// 测试Promise.all
function fn1() {
//   return MyPromise.resolve(1);
  return MyPromise.reject(1);
}
function fn2() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 2000);
  });
}
function fn3() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(3); // 一旦有失败的，整体都是失败的，存储的是当前失败的这个实例的原因
    }, 1000);
  });
}

MyPromise.all([fn1(), fn2(), fn3(), 10])
  .then(function (values) {
      console.log(values)
  })
  .catch(function (reason) {
    console.log(reason,'reason') 
  });
//  [ 1, 3, 3, 10 ]
//  1


// Mypromise 插件
//   (function(){

//       window.MyPromise = MyPromise;
//   })();
// 问ES6，同步异步，事件循环 基于Promise实例管控异步编程
// 事件循环 实战应用 源码 同步异步 原生js写过设计规范
// 事件基础知识 。。。。

// 周三 按理 放大镜 拖拽
// 周五 插件封装
// 设计模式
// 周日 ajax、http