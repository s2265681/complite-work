class SyncWaterfallHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tap(name, fn) {
    this.tasks.push(fn);
  }
  call(...args) {
    let ret;
    for (let i = 0; i < this.tasks.length; i++) {
      ret = this.tasks[i](...args);
      if (ret !== undefined) {
        ret = this.tasks[i](ret);
      }
    }
  }
}

module.exports = {
  SyncWaterfallHook,
};
