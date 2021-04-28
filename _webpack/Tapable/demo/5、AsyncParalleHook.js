let { AsyncParallelHook } = require("tapable");
// let { AsyncParallelHook } = require("../lib/5、AsyncParalleHook");

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(["name"]),
    };
  }
  tap() {
    let index = 0;
    this.hooks.arch.tapAsync("node", (name, cb) => {
      setTimeout(() => {
        console.log("node", index);
        cb()
      }, 1000);
    });
    this.hooks.arch.tapAsync("react", (name, cb) => {
      setTimeout(() => {
        console.log("react");
        cb()
      }, 1000);
    });
  }
  start() {
    this.hooks.arch.callAsync("rock",function(){
        console.log('ending')
    });
  }
}
let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
