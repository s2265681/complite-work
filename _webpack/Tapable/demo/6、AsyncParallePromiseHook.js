// let { AsyncParallelHook } = require("tapable");
let { AsyncParallePromiseHook } = require("../lib/6、AsyncParallePromiseHook");

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallePromiseHook(["name"]),
    };
  }
  tap() {
    this.hooks.arch.tapPromise("node", (name) => {
      return new Promise((resolve, rej) => {
        setTimeout(() => {
          console.log("node");
          resolve();
        }, 1000);
      });
    });
    this.hooks.arch.tapPromise("react", (name) => {
      return new Promise((resolve, rej) => {
        setTimeout(() => {
          console.log("react");
          resolve();
        }, 1000);
      });
    });
  }
  start() {
    this.hooks.arch.promise("rock").then(() => {
      console.log("ending");
    });
  }
}
let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
