var name = "World";
!(function () {
  if (typeof name === "undefined") {
    var name = "Jack";
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();
// 初始化函数 作用域 参数 变量
// 答案： Goodbye Jack
// 去掉 var name 后 为 Hello World
