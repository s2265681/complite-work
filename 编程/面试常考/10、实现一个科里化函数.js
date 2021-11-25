function currying(fn, ...args1) {
  // 获取fn参数有几个
  let length = fn.length;
  let allArgs = [...args1];
  const res = function (...args2) {
    allArgs = [...allArgs, ...args2];
    // 长度相同返回执行结果
    if (allArgs.length === length) {
      return fn(...allArgs);
    } else {
      // 不相同继续返回函数
      return res;
    }
  };
  return res;
}

const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2, 3)); // 1 + 2 + 3=6
