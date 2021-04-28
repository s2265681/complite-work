// let { SyncBailHook } = require("tapable");
let { SyncBailHook } = require("../lib/2、SyncBailHook");

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncBailHook(["name"]),
    };
  }
  tap() {
    this.hooks.arch.tap("node", (name) => {
      console.log("node", name);
      return undefined
    });
    this.hooks.arch.tap("react", (name) => {
      console.log("react", name);
    });
  }
  start() {
    this.hooks.arch.call("rock");
  }
}
let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
