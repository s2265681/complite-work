/**
 * AsyncParallelHook
 * 异步钩子
 * 1、串行异步 第一个执行完执行后面
 * 2、并行异步 等待所有的异步事件执行后，在执行
 * 注册方法分为tap注册 promise 注册里面有回调标识什么时候执行完
 * 调完之后 有个计数器 每次的执行完 计数器等于总的函数后 执行 callAsync 代码
 */

class AsyncParallelHook {
  // 异步并行钩子
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    let tasks = this.tasks.map((task) => task(...args));
    return Promise.all(tasks);
  }
}

let hooks = new AsyncParallelHook(["name"]);
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
