/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-11-29 17:19:57
 */

var obj = {
  a: {
    c: [1, 2],
  },
  b: 1,
};
obj.a.c.d = obj;

/**
 * 实现思路：用一个数组存储每一个遍历过的对象，下次找到数组中存在，则说明有循环引用
 */

function cycleDetector(obj) {
  const arr = [obj];
  let flag = false;
  function cycle(o) {
    const keys = Object.keys(o);
    for (const key of keys) {
      const temp = o[key];
      if (typeof temp === "object" && temp !== null) {
        if (arr.indexOf(temp) >= 0) {
          flag = true;
          return;
        }
        arr.push(temp);
        cycle(temp);
      }
    }
  }
  cycle(obj);
}

console.log(cycleDetector(obj)); // true
