class AsyncParallePromiseHook {
  constructor(config) {
    this.config = config;
    this.tasks = [];
  }
  tapPromise(name, fn) {
    this.tasks.push(fn);
  }
  promise(args) {
    let tasks = this.tasks.map((task) => task(...args));
    return Promise.all(tasks)
  }
}

module.exports = {
    AsyncParallePromiseHook
};
