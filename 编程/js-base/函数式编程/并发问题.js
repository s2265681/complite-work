// 异步逻辑， 并发问题 PromiseAll
const fs = require("fs");
const path = require("path");
const { emit } = require("process");

let person = {};
// node 中的回调 第一个参数 永远是 err-first
fs.readFile(path.resolve(__dirname, "name.txt"), "utf8", function (err, name) {
  console.log(name);
  //   print("name", name);
  //   print2("name", name);
  events.emit("name", name);
});

fs.readFile(path.resolve(__dirname, "age.txt"), "utf8", function (err, age) {
  console.log(age);
  //   print("age", age);
  //   print2("age", age);
  events.emit("age", age);
});

// 异步开发，需要最终一起获得结果
// low 哨兵变量
let timers = 0;
function print(key, value) {
  person[key] = value;
  if (++timers === 2) {
    console.log("person", person);
  }
}

function after(n, callback) {
  const person2 = {};
  return function (key, value) {
    person2[key] = value;
    if (--n === 0) {
      return callback(person2);
    }
  };
}

let print2 = after(2, function (data) {
  console.log(data, "print2");
});

let person3 = {};
// 发布订阅   逻辑先存起来
let events = {
  _arr: [],
  on(fn) {
    // 订阅
    this._arr.push(fn);
  },
  emit(key, value) {
    // 发布订阅
    person3[key] = value;
    this._arr.forEach((fn) => fn(person3));
  },
};

events.on(() => {
  console.log("读取了1");
});

events.on((person) => {
  if (Reflect.ownKeys(person).length === 2) console.log(person);
  console.log("读取了2");
});
