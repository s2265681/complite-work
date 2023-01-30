let arr = [1, 2, 3];

// 不能写箭头函数
Array.prototype.myReduce = function (func, startValue) {
  let arr = this;
  // startValue 有值的话 就从
  let startIdx = typeof startValue === "undefined" ? 1 : 0;
  let acc = typeof startValue === "undefined" ? arr[0] : startValue;
  for (let i = startIdx; i < arr.length; i++) {
    acc = func(acc, arr[i]);
  }
  return acc;
};

let result = arr.myReduce((acc, cur) => acc + cur);
console.log(result);

function t(a) {
  return function () {
    console.log(a++, "aa");
  };
}

// 被引用 就不会回收 内部函数被外部引用， 外部函数就不会销毁，作用域就不会销毁，除非内部函数 设置为 null
let c = t(4);
console.log(c());
console.log(c());
c = null;
console.log(t(4)());
