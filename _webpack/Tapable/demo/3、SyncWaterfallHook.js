let { SyncWaterfallHook } = require("tapable");
// let { SyncWaterfallHook } = require("../lib/2、SyncBailHook");

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncWaterfallHook(["name"]),
    };
  }
  tap() {
    this.hooks.arch.tap("node", (name) => {
      console.log("node", name);
    //   return unde
      return '1111'
    });
    this.hooks.arch.tap("react", (data) => {
      console.log("data", data);
      return '111222'
    });
    this.hooks.arch.tap("react111", (data) => {
        console.log("data", data);
      });
  }
  start() {
    this.hooks.arch.call("rock");
  }
}
let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
