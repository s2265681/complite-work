// let { SyncLoopHook } = require("tapable");
let { SyncLoopHook } = require("../lib/4、SyncLoopHook");

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(["name"]),
    };
  }
  tap() {
    let index = 0;
    this.hooks.arch.tap("node", (name) => {
      index++;
      console.log("node", index);
      //   return index === 3 ? undefined : "返回循环";
      return "返回循环";
    });
    this.hooks.arch.tap("react", (data) => {
      console.log("react");
    });
  }
  start() {
    this.hooks.arch.call("rock");
  }
}
let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
