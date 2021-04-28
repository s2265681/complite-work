let {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,  // 带保险异步并发的钩子  多个error
  AsyncSeriesHook      // 异步串行
} = require("tapable");

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncSeriesHook(["name"]),
    };
  }
  tap() {
    console.log("注册监听函数");
    // 注册监听函数
    this.hooks.arch.tapAsync("node", (name,cb) => {
      setTimeout(()=>{
         console.log('node',name)
         cb()
      },1000)
    });
    this.hooks.arch.tapAsync("react", (name,cb) => {
        setTimeout(()=>{
            console.log('react',name)
            cb()
         },1000)
    });
  }
  start() {
    this.hooks.arch.callAsync("rock",function(){
        console.log('异步执行完，ending')
    });
  }
}

let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
