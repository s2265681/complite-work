// let { AsyncSeriesHook } = require("tapable");
let { AsyncSeriesHook } = require("../lib/7、AsyncSeriesHook");

// 支持promise
class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncSeriesHook(["name"]),
    };
  }
  tap() {
    // this.hooks.arch.tapAsync("node", (name, cb) => {
    //   setTimeout(() => {
    //     console.log("node", index);
    //     cb()
    //   }, 1000);
    this.hooks.arch.tapPromise("node", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("node");
          resolve();
        }, 1000);
      });
    });
    this.hooks.arch.tapPromise("react", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("react");
          resolve();
        }, 1000);
      });
    });
  }
  start() {
    // this.hooks.arch.callAsync("rock", function () {
    //   console.log("ending");
    // });
    this.hooks.arch.promise("rock").then((res) => {
      console.log("ending");
    });
  }
}
let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
