/**
 * 同步有关联的流程控制
 * 前面函数的执行结果 的返回结果给后面的函数执行
 */
class SyncWaterfallHook {
  constructor() {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
      let [ first, ...others ] = this.tasks;
      let ret = first(...args);
      others.reduce((a,b)=>{
         return b(a)
      },ret)
  }
}

let hook = new SyncWaterfallHook(["name"]);
hook.tap("react", function (name) {
  console.log("react", name);
  return "react ok";
});
hook.tap("node", function (data) {
  console.log(data, "data.>>>>");
  return 'node ok'
});
hook.tap("webpack", function (data) {
    console.log(data, "data.>>>>");
  });
hook.call("rock");
