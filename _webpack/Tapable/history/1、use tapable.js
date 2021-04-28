let { SyncHook } = require("tapable");

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(["name"]),
    };
  }
  tap() {
    console.log("注册监听函数");
    // 注册监听函数
    this.hooks.arch.tap("node", function (name) {
      console.log("node", name);
    });
    this.hooks.arch.tap("react", function (name) {
      console.log("react", name);
    });
  }
  start() {
    console.log("开始");
    this.hooks.arch.call("rock");
  }
}

let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
