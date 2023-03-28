// 发布订阅模式 是对观察者模式的一个升级、灵感来源域DOM2级事件设计模式
// 数据结构 { init : [func1 , func2 ]  }

(function () {
  // 基于工厂设计模式，实现把Sub当作普通函数执行，但是也可以创造其实例
  function Sub() {
    return new init();
  }

  function init() {
    // 创建事件池
    this.listeners = {};
  }

  // 原型链的处理
  Sub.prototype = {
    constructor: Sub,
    // 向指定自定义事件的容器中追加方法
    on(type, func) {
      // 首先验证一下是否存在这个自定一时间，不存在就创建一个
      !this.listeners.hasOwnProperty(type) ? (this.listeners[type] = []) : null;
      let arr = this.listeners[type];
      if (!arr.includes(func)) {
        arr.push(func);
      }
    },
    // 从指定自定义事件的容器中移除方法
    off(type, func) {
        let arr = this.listeners[type];
        if (!arr) return;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === func) {
                /* // splice删除是改变原始数组的：删除项后面的每一项索引都要向前提一位
                // “数组塌陷”，这样的操作很容易带来问题
                arr.splice(i, 1); */

                // 为了防止塌陷导致的问题，我们在移除的时候，不要修改原始数组的结构 
                arr[i] = null;
                break;
            }
        }
    },
    // 通知指定的自定义事件的容器中的方法执行
    fire(type, ...args) {
      // 通知指定自定义事件的容器中的方法执行
      let arr = this.listeners[type];
      if (!arr) return;
      for (let i = 0; i < arr.length; i++) {
          let item = arr[i];
          if(typeof item === "function"){
              item.call(this,...args)
          }else{
              // 也会数组塌陷，下一轮循环还是从当前索引开始
              arr.splice(i,1)
              i--;
          }
      }
    },
  };
  init.prototype = Sub.prototype;
  window.Sub = Sub;
})();

function fn1(n, m) {
  console.log(1, n, m);
}
function fn2(n, m) {
  console.log(2, n, m);
}
function fn3() {
  console.log(3);
}
let s1 = Sub();
s1.on("init", fn1);
s1.on("init", fn2);
s1.on("init", fn3);
s1.on("click", fn2);
s1.fire("init", 10, 20);
s1.fire("click", 10, 20);
// 1 10 20
// 1.js:54 2 10 20
// 1.js:57 3