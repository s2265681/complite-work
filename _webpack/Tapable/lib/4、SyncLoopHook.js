class SyncLoopHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tap(name, fn) {
    this.tasks.push(fn);
  }
  call(...args) {
    // 方法一： 建一个索引 依次执行每一个函数 当函数执行后返回是undefined时，i++
    let ret;
    for (let i = 0; i < this.tasks.length; ) {
      ret = this.tasks[i](...args);
      if (ret === undefined) {
        i++;
      } else {
        ret = this.tasks[i](...args);
      }
    }
  }
}

module.exports = {
  SyncLoopHook,
};
