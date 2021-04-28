class SyncBailHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tap(name, fn) {
    this.tasks.push(fn);
  }
  call(...args) {
    for (let i = 0; i < this.tasks.length; i++) {
      let ret = this.tasks[i](...args);
      if (ret === undefined) break;
    }
  }
}

module.exports = {
  SyncBailHook,
};
