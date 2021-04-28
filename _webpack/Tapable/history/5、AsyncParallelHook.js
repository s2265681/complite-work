/**
 * AsyncParallelHook
 * 异步钩子
 * 1、串行异步 第一个执行完执行后面
 * 2、并行异步 等待所有的异步事件执行后，在执行
 * 注册方法分为tap注册 tapAsync注册里面有回调标识什么时候执行完
 * 调完之后 有个计数器 每次的执行完 计数器等于总的函数后 执行 callAsync 代码
 */

class AsyncParallelHook {
  // 异步并行钩子
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    let finalCallback = args.pop(); // 拿出最后一个参数
    let index = 0;
    const done = () => {
      index++;
      if (index == this.tasks.length) {
        finalCallback();
      }
    };
    this.tasks.forEach((task) => {
      task(...args, done);
    });
  }
}

let hooks = new AsyncParallelHook(["name"]);
hooks.tapAsync("react", (name, cb) => {
  setTimeout(() => {
    console.log("react", name);
    cb();
  }, 1000);
});

hooks.tapAsync("node", (name, cb) => {
  setTimeout(() => {
    console.log("node", name);
    cb();
  }, 1000);
});

// 等都执行完 在执行下面函数
hooks.callAsync("rock", function () {
  console.log("异步执行完，ending");
});
