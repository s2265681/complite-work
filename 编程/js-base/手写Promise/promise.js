const PEDDING = "pedding";
const FUILLED = "fuilled";
const REJECTED = "rejected";

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 防止自己等待自己
    return reject(new TypeError("循环引用了"));
  }
  // resolve(x);
}

function MyPromise(excutor) {
  this.status = PEDDING;
  this.value = undefined;
  this.reason = undefined;
  const _this = this;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  function resolve(res) {
    //! z注意this
    if (_this.status !== PEDDING) return;
    _this.status = FUILLED;
    _this.value = res;
    _this.onFulfilledCallbacks.forEach((fn) => {
      fn(res);
    });
  }
  function reject(err) {
    if (_this.status !== PEDDING) return;
    _this.status = REJECTED;
    _this.reason = err;
    _this.onRejectedCallbacks.forEach((fn) => fn(err));
  }
  try {
    excutor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const _this = this;
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function (data) {
          return data;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (err) {
          throw err;
        };

  let promise2 = new MyPromise((resolve, reject) => {
    if (_this.status === FUILLED) {
      setTimeout(function () {
        try {
          let x = onFulfilled(_this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
    if (_this.status === REJECTED) {
      setTimeout(function () {
        try {
          let x = onRejected(_this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
    if (_this.status === PEDDING) {
      // 先收集，等执行resolve或者reject的时候再拿出来执行该函数
      _this.onFulfilledCallbacks.push(() => {
        try {
          let x = onFulfilled(_this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
      _this.onRejectedCallbacks.push(() => {
        try {
          let x = onRejected(_this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
  return promise2;
};

module.exports = MyPromise;

// 1、实现一个Promise，执行一次，状态只更改一次
// 2、实现异步，更改状态
// 3、实现then多次调用回调 发布订阅模式
// 4、实现链式调用, 实现带异步的链式调用
// 5、通过微任务改造
// 6、防止实现循环引用 example2
