/**
 * SyncLoopHook
 * 方法执行多次 在下面走
 * 当前一个函数执行结果为undefined时，执行下一个函数
 */
class SyncLoopHook {
  constructor() {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    this.tasks.forEach((task) => {
      let ret;
      do {
        ret = task(...args);
      } while (ret !== undefined);
    });
  }
}

let total = 0;
let hook = new SyncLoopHook(["name"]);
hook.tap("react", function (name) {
  console.log("node", name);
  return ++total === 3 ? undefined : "继续学";
});
hook.tap("node", function (name) {
  console.log("node.>>>>");
});
hook.tap("webpack", function (name) {
  console.log("webpack.>>>>");
});
hook.call("rock");
