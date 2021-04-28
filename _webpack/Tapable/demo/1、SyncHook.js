// let { SyncHook } = require("tapable");
let {SyncHook} = require("../lib/1、SyncHook");

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncHook(["name"]),
    };
  }
  tap() {
    this.hooks.arch.tap("node", (name) => {
      console.log("node", name);
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
