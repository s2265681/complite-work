// promise
// 1. Promise是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
// 2. Promise中有三种状态，分别为成功（fulfilled）、失败（rejected）和等待（pending）
// 3. resolve和reject函数是用来更改状态的
// 4. then方法内部做的事情就判断状态，如果状态是成功，调用成功的回调函数，如果状态是失败，调用失败的回调函数
// 5. then成功回调有一个参数，表示成功之后的值，then失败回调有一个参数，表示失败后的原因
// const fs = require("fs");
// const path = require("path");
// fs.readFile(path.resolve(__dirname, "name.txt"), "utf8", function (err, data) {
//   fs.readFile(path.resolve(__dirname, data), "utf8", function (err, data) {});
// });

// Promise 解决了什么问题
// 1. 解决了回调地狱的问题
// 2. 解决了多个异步并发执行后，得到最终结果的问题
// 3. 解决了异步嵌套的问题
// 4. 解决了错误处理的问题
const MyPromise = require("./promise");
const promise2 = new MyPromise((resolve, reject) => {
  resolve();
  console.log("11");
}).then(() => {
  return promise2;
});

// [TypeError: Chaining cycle detected for promise #<Promise>]
