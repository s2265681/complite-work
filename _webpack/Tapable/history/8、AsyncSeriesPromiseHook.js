/**
 * AsyncSeriesHook
 * 异步串行钩子
 * 根express中间件很像，一个执行完 另一个再执行 依赖next函数写递归
 */

class AsyncSeriesHook {
  // 异步并行钩子
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    // 异步迭代 需要一个中间函数
    let [first, ...others] = this.tasks;
    let ret = first(...args);
    return others.reduce((p, n) => {  // 和 redux 源码 一样
      return p.then(() => n(...args));
    }, ret);
  }
}

let hooks = new AsyncSeriesHook(["name"]);
hooks.tapPromise("react", (name, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("react", name);
      resolve();
    }, 1000);
  });
});

hooks.tapPromise("node", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("node", name);
      resolve();
    }, 1000);
  });
});

// 等都执行完 在执行下面函数
hooks.promise("rock").then((res) => {
  console.log("end");
});
