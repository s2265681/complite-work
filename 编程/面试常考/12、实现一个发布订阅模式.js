/**
 * 实现一个发布订阅模式
 * 题目描述:实现一个发布订阅模式拥有on emit once off方法
 * this.cache = {}  每一个任务都是一个数组 根据不同的key名  存到cache中
 * on的时候 收集， off的时候去除任务中数组中的方法， once执行一次 删除当前key， emit 一次执行任务中的方法
 */
class EventEmitter {
  constructor() {
    this.cache = {};
  }
  on(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }
  off(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((item) => item === fn);
      if (index >= 0) {
        this.cache[name].splice(index, 1);
      }
    }
  }
  emit(name, once = false, ...args) {
    // slice 复制一份 防止回调里继续on，导致死循环
    const tasks = this.cache[name].slice();
    if (tasks) {
      for (const fn of tasks) {
        fn(...args);
      }
    }
    if (once) {
      delete this.cache[name];
    }
  }
  once(name, ...args) {
    this.emit(name, true, ...args);
  }
}

const eventEmitter = new EventEmitter();

const f1 = () => console.log(1);
const f2 = () => console.log(2);

eventEmitter.on("ff", f1);
eventEmitter.on("ff", f2);

eventEmitter.once("ff");
