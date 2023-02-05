function MyPromise(executor) {
  var self = this;
  self.status = "pending";
  self.value;
  self.reason;
  self.onResolvedCallbacks = []; // 存放所有成功的回调。
  self.onRejectedCallbacks = []; // 存放所有失败的回调。
  function resolve(value) {
    if (self.status === "pending") {
      self.status = "resolved";
      self.value = value;
      self.onResolvedCallbacks.forEach(function (fn) {
        fn();
      });
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.reason = reason;
      self.onRejectedCallbacks.forEach(function (fn) {
        fn();
      });
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 防止自己等待自己
    return reject(new TypeError("循环引用了"));
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var self = this;
  const promise2 = new MyPromise(function (resolve, reject) {
    if (self.status === "resolved") {
      setTimeout(function () {
        try {
          const x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (self.status === "rejected") {
      setTimeout(function () {
        try {
          const x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
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
