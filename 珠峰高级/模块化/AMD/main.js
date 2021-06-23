// 全局配置
var requirejs = require('requirejs');
requirejs.config({
  baseUrl:"./lib",
})
requirejs(['moduleB','moduleA'],function (moduleB,moduleA) {
  console.log(moduleB.average(10,20,30,40,50))
});