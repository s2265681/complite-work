class AsyncParallelHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }
  callAsync(args, doneFn) {
    let index = 0;
    // 执行每一个异步任务，具有一个回调的函数，执行回调函数然后index+1，当index===一共的异步任务时执行callAsync
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i](args, () => {
        index++;
        if (index === this.tasks.length) {
          doneFn();
        }
      });
    }
  }
}

module.exports = {
  AsyncParallelHook,
};
