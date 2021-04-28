class AsyncSeriesHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }
  callAsync(...args) {
    // 异步中间间 需要中间函数
    let index = 0;
    let finallyCallback = args.pop();
    let next = () => {
      if (index === this.tasks.length) return finallyCallback();
      this.tasks[index++](...args, next);
    };
    next();
  }
  tapPromise(name, fn) {
    this.tasks.push(fn);
  }
  promise(...args) {
    // 异步串行 这种用跌掉器 reduce
    let [firstFun, ...others] = this.tasks;
    let ret = firstFun(...args);
    return others.reduce((p, n) => {
      return p.then(() => n(...args));
    }, ret);
  }
}

module.exports = {
  AsyncSeriesHook,
};
