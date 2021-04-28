/**
 * AsyncSeriesHook
 * 异步串行钩子
 * 根express中间件很像，一个执行完 另一个再执行 依赖next函数写递归
 */

class AsyncSeriesWaterfallHook {
  // 异步并行钩子
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {  // tapPromise + promise
    // 异步迭代 需要一个中间函数
    let index = 0;
    let finalCallback = args.pop();
    let next = (err, data) => {
      //    if(this.tasks.length === index) return finalCallback()
      let task = this.tasks[index];
      if (!task) return finalCallback();
      if (index === 0) { // 执行的是第一个函数
        task(...args, next);
      } else {
        task(data, next);
      }
      index++;
    };
    next();
  }
}

let hooks = new AsyncSeriesWaterfallHook(["name"]);
hooks.tapAsync("react", (name, cb) => {
  setTimeout(() => {
    console.log("react", name);
    cb(null, "结果");
  }, 1000);
});

hooks.tapAsync("node", (name, cb) => {
  setTimeout(() => {
    console.log("node", name);
    cb(null, "结果");
  }, 1000);
});

// 等都执行完 在执行下面函数
hooks.callAsync("rock", function () {
  console.log("ending");
});
