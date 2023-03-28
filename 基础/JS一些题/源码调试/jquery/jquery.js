(function (window, undefined) {
  console.log(window, "window1");
})(window);

console.log(window, "window2");

// 传递window - 避免污染顶级变量 - 减少作用域查找链路
// 传递undefined undefined 是一个系统变量 有查找的过程（赋值不会报错，不生效）， null 是一个关键词，赋值会报错

this.a;

// 模块化规范
// 早起前端， 没有模块化
// 早期需要引入secript标签
// 民间 AMD （typeof define === 'function' && define.amd ）
// 民间 CMD
// 官方 ES6 moudles

// Node COMMENJS

// 判断 代码检测， 兼容不同规范
var fabric = fabric || { version: "4.2.0" };
if (typeof exports !== "undefined") {
  exports.fabric = fabric;
} else if (typeof define === "function" && define.amd) {
  /* _AMD_START_ */
  define([], function () {
    return fabric;
  });
}
/* _AMD_END_ */
if (typeof document !== "undefined" && typeof window !== "undefined") {
  if (
    document instanceof
    (typeof HTMLDocument !== "undefined" ? HTMLDocument : Document)
  ) {
    fabric.document = document;
  } else {
    fabric.document = document.implementation.createHTMLDocument("");
  }
  fabric.window = window;
}

// 工厂模式的应用 —— jquery —— dom 时代 获取大量dom
// - 当需要频繁的产出 频繁的调用类似的对象

// new $('dom1')  查找对象
// $('dom1')   查找对象

// 工厂模式 基本结构 暴露出 工厂方法 而不是类本身
function factory() {
  return new factory();
}

jQuery.Animation;

// vue2 建造者模式
new Vue();

// 弹窗工具 —— 工厂模式  1、不会很复杂 2、弹窗频繁

// 工具库 函数库  - tree shaking

// jquery-extend
$.extend({ a: 1 }); //=> {a:1}
$.extend({ a: 1 }, { b: 2 }); //=> {a:1,b:2}

$.extend = function () {
  // 享元模式
  if (arguments.length === 1) {
    for (var item in arguments[0]) {
      this[item] = arguments[0][item];
    }
  } else if (arguments.length === 2) {
    for (var item in arguments[1]) {
      arguments[0][item] = arguments[1][item];
    }
  }
};
