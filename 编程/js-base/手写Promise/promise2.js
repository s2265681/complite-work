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
